vue.with compiler

umd global

包含编译器,运行时编译

编译发生的时刻是挂载时



vue.runtime.js

运行时不会编译

预编译:vue-loader

打包:webpack调用它执行编译,将所有vue文件,SFC,转换 template => render

好处:包体积小,执行时候速度快



ast:与vnode相似的中间产物



template =>(粗糙) ast => transform(深加工) => ast => generate(代码生成) => render

