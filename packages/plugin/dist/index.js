'use strict';

Object.defineProperty(exports, "__esModule", { value: true });
exports.forceInlineModule = void 0;
const uuid_1 = require("uuid");
async function getJsSafeUUID() {
    // @ts-ignore
    // const { randomUUID } = await import('node:crypto');
    const randomUUID = uuid_1.v4;
    const busterId = `r${randomUUID()}`;
    const safeUUID = busterId.substring(0, 9);
    return safeUUID;
}
// This plugin is tricking Vite into inlining contents of files/imports that match the `bust` array.
// Somehow Vite is not making use of the `shouldTransformCachedModules` hook of rollup.
// So we add a random string to the end of the file in order to make our plugin
// add a random ID to the file contents to finally have vite bust its own cache.
// TODO: Figure out a way to use assertions in Vite to make this work.
function forceInlineModule({ inlineModules: inlineModules = [] }) {
    const codeBuffer = new Map();
    return {
        name: 'transform-code',
        enforce: 'pre',
        resolveId: {
            async handler(source, importer, options) {
                if (inlineModules.some((item) => source.includes(item))) {
                    const resolution = await this.resolve(source, importer, {
                        skipSelf: true,
                        ...options,
                    });
                    if (!resolution)
                        return;
                    const code = await this.load({ id: resolution.id });
                    codeBuffer.set(source, code);
                    const buster = await getJsSafeUUID();
                    return { id: `\0${source}-cache?${buster}` };
                }
            },
        },
        load: {
            async handler(id) {
                if (id.startsWith('\0') && id.includes('-cache?')) {
                    const [originalmodule, buster] = id.split('-cache?');
                    const cb = codeBuffer.get(originalmodule.substring(1));
                    const code = (cb.code += `\n export const ${buster} = 1;`);
                    return { code, map: { mappings: '' } };
                }
            },
        },
    };
}
exports.forceInlineModule = forceInlineModule;
