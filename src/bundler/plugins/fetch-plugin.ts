import * as esbuild from "esbuild-wasm";
import axios from "axios";

import localForage from "localforage";

const fileCahce = localForage.createInstance({
  name: "filecache"
});

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetchPlugin",
    setup: (build: esbuild.PluginBuild) => {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        /*
					check to see if we've already stored the file in cache (indexDB).
					If yes then just return it immediately, else, make a request and store
					the data in indexDB  
					*/
        const cachedResult = await fileCahce.getItem<esbuild.OnLoadResult>(args.path);

        if (cachedResult) {
          return cachedResult;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        // console.log("data = ", data, "request = ", request);

        const contents = `
                                const styles = document.createElement('style');
                                styles.innerText = '${data
                                  .replace(/"/g, '\\"')
                                  .replace(/'/g, "\\'")
                                  .replace(/\n/g, "")}';
                                document.head.appendChild(styles);
                            `;

        let result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname
        };

        await fileCahce.setItem(args.path, result);

        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        // console.log("data = ", data, "request = ", request);

        let result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname
        };

        await fileCahce.setItem(args.path, result);

        return result;
      });
    }
  };
};
