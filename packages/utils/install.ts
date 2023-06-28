import { AppContext, Plugin, App, Directive } from "vue"

/**
 * T & Plugin是交叉类型
 * SFCInstallComp<T> 将类型参数T与Plugin进行交叉操作的类型别名 
*/
export type SFCInstallComp<T> = T & Plugin;

/**
 * SFCInstallComp<T> & { _context: AppContext | null } 是交叉类型
 * SFCInstallContext<T> 是一个将类型与包含 _context 属性的对象，进行交叉操作的类型别名
*/
export type SFCInstallContext<T> = SFCInstallComp<T> & {
  _context: AppContext | null
}
// type Record<K extends string | number | symbol, T> = { [P in K]: T; }
export const installComponent = <T extends Record<string, any>>(main: T) => {
  (main as SFCInstallComp<T>).install = (app: App): void => {
    for (const comp of [main]) {
      const { __file, name} = comp;
      const fileName = __file.match(/([^/]+)\.vue/)[1];
      console.log(111111, fileName);
      name ? app.component(name, comp) : app.component(`Bl${fileName.charAt(0).toUpperCase()}${fileName.slice(1)}`, comp);
    }
  }
  return main as SFCInstallComp<T>;
}

export const installFunction = <T>(fn: T, name: string) => {
  (fn as SFCInstallComp<T>).install = (app: App) => {
    (fn as SFCInstallContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  }
  return fn as SFCInstallContext<T>;
}

export const installDirective = <T extends Directive>(directive: T, name: string) => {
  (directive as SFCInstallComp<T>).install = (app: App) => {
    app.directive(name, directive);
  }
  return directive as SFCInstallComp<T>; 
}