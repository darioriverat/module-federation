export default async function loadModule() {
    const env = import.meta.env.MODE;
    const host_one = import.meta.env.VITE_DEV_APP_ONE_HOST;
    const host_one_port = import.meta.env.VITE_DEV_APP_ONE_HOST_PORT;

    /**
     * This dynamic import cannot be analyzed by Vite.
     * See https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations for supported dynamic import formats.
     * The comment inside the import() call to suppress this warning.
     */
    const remote_one_url = host_one + (host_one_port ? `:${host_one_port}` : '');
    const remote_one_loader = (env == 'development')
    ? () => import(/* @vite-ignore */ `${remote_one_url}/src/main.js`)
    : () => import('remote_one/main');

    let remote_one_module = await remote_one_loader()
    remote_one_module = (env == 'production') ? remote_one_module.default : remote_one_module
    remote_one_module.mountComponent({elementId: '#app_one'})
}
