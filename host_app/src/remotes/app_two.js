export default async function loadModule() {
    const env = import.meta.env.MODE;
    const host_two = import.meta.env.VITE_DEV_APP_TWO_HOST;
    const host_two_port = import.meta.env.VITE_DEV_APP_TWO_HOST_PORT;

    const remove_two_url = host_two + (host_two_port ? `:${host_two_port}` : '');
    const remote_two_loader = (env == 'development')
    ? () => import(/* @vite-ignore */ `${remove_two_url}/src/main.js`)
    : () => import('remote_two/main');

    let remote_two_module = await remote_two_loader()
    remote_two_module = (env == 'production') ? remote_two_module.default : remote_two_module
    remote_two_module.mountComponent({elementId: '#app_two'})
}
