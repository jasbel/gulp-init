# Asbel Apaza

## Inicio de un programa con git hub

echo "# gulp-init" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/jasbel/gulp-init.git
git push -u origin master

# Gulp Sass Bootstrap ...

# Sass Boilerplate

Este es un proyecto de muestra que utiliza el [patrón de arquitectura 7-1](http://sass-guidelin.es/#architecture) y se adhiere a [Sass Guidelines](http://sass-guidelin.es) convenciones de escritura.

Cada carpeta de este proyecto tiene su propio archivo `README.md` para explicar el propósito y agregar información adicional. Asegúrese de navegar por el repositorio para ver cómo funciona.

## Usando la sintaxis sangrada

### Conversión Sass

Este repetitivo no proporciona una versión `.sass` ya que sería doloroso mantener ambas versiones sin un proceso de compilación adecuado. Sin embargo, es muy fácil convertir esta plantilla repetitiva a sintaxis con indentacion Sass.

Clone it, head into the project and then run:

```
sass-convert -F scss -T sass -i -R ./  && find . -iname “*.scss” -exec bash -c 'mv "$0" “${0%\.scss}.sass"' {} \;
```

### Usar con Node-sass

When using `node-sass` - in order to build that boilerplate, one needs to:

- install `node-sass` if not yet installed:

```bash
npm install -g node-sass
```

- run build command from command line:

```bash
node-sass stylesheets/main.scss dist/main.css
```

# Sass Boilerplate

Este es un proyecto de muestra que utiliza el [patrón de arquitectura 7-1](http://sass-guidelin.es/#architecture) y se adhiere a [Sass Guidelines](http://sass-guidelin.es) convenciones de escritura.

Cada carpeta de este proyecto tiene su propio archivo `README.md` para explicar el propósito y agregar información adicional. Asegúrese de navegar por el repositorio para ver cómo funciona.

## Usando la sintaxis sangrada

### Conversión Sass

Este repetitivo no proporciona una versión `.sass` ya que sería doloroso mantener ambas versiones sin un proceso de compilación adecuado. Sin embargo, es muy fácil convertir esta plantilla repetitiva a sintaxis con sangría Sass.

Clónelo, diríjase al proyecto y luego ejecute:

`` ` sass-convert -F scss -T sass -i -R ./ && find. -iname “* .scss” -exec bash -c 'mv "$ 0" “$ {0% \. scss} .sass"' {} \; `` `

### Usar con Node-sass

Cuando se usa `node-sass` - para construir esa plantilla repetitiva, uno necesita:

- instale `node-sass` si aún no está instalado:

`` `fiesta npm install -g node-sass `` `

- ejecutar el comando de compilación desde la línea de comandos:

`` `fiesta hojas de estilo de nodo-sass / main.scss dist / main.css `` `

# Structure sass

0. [Styles.css](#0.-styles-Main-file)
1. [Utilities](#1.-utilities)
1. [Vendors](#2.-vendors)
1. [Base](#3.-base)
1. [layout](#4.-layout)
1. [Component](#5.-component)
1. [Pages](#6.-pages)
1. [Theme ](#-7.-theme)

## 0. (styles) Main file

El archivo principal (generalmente etiquetado como `main(or styles).scss`) debería ser el único archivo Sass de toda la base de código que no comience con un guión bajo. Este archivo no debe contener más que `@ import` y comentarios.

_Nota: cuando se utiliza [Eyeglass](https://github.com/sass-eyeglass/eyeglass) para la distribución, puede ser una buena idea nombrar este archivo `index.scss` en lugar de`main(styles).scss` para se adhieren a [Especificaciones de los módulos de sass](https://github.com/sass-eyeglass/eyeglass#writing-an-eyeglass-module-with-sass-files)._
_Ver [# 21](https://github.com/HugoGiraudel/sass-boilerplate/issues/21) para referencia ._

## 1. Utilities

La carpeta `utilities /` reúne todas las herramientas y ayudantes de Sass utilizadas en todo el proyecto. Todas las variables, funciones, mixin y marcadores de posición globales deben colocarse aquí.

La regla general para esta carpeta es que no debe generar una sola línea de CSS cuando se compila por sí sola. Estos no son más que ayudantes de Sass.

## 2. Vendors

La mayoría de los proyectos tendrán una carpeta `vendors /` que contendrá todos los archivos CSS de bibliotecas y marcos externos: Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, etc. Ponerlos a un lado en la misma carpeta es una buena manera de decir "Hey, esto no es de mí, no es mi código, no es mi responsabilidad".

Si tiene que anular una sección de cualquier proveedor, le recomiendo que tenga una octava carpeta llamada `vendors-extensions /` en la que puede tener archivos nombrados exactamente después de los proveedores que sobrescriben. Por ejemplo, `vendors-extensions / _bootstrap.scss` es un archivo que contiene todas las reglas CSS destinadas a volver a declarar algunos de los CSS predeterminados de Bootstrap. Esto es para evitar editar los archivos del proveedor, lo que generalmente no es una buena idea.

## 3. Base

La carpeta `base /` contiene lo que podríamos llamar el código repetitivo para el proyecto. Allí, puede encontrar algunas reglas tipográficas, y probablemente una hoja de estilo (que estoy acostumbrado a llamar `_base.scss`), que define algunos estilos estándar para elementos HTML de uso común.

## 4. Layout

La carpeta `layout /` contiene todo lo que interviene en el diseño del sitio o la aplicación. Esta carpeta podría tener hojas de estilo para las partes principales del sitio (encabezado, pie de página, navegación, barra lateral ...), el sistema de cuadrícula o incluso estilos CSS para todos los formularios.

## 5. Components

Para componentes pequeños, existe la carpeta `components /`. Mientras que `layout /` es macro (que define la estructura global), `components /` está más enfocado en widgets. Contiene todo tipo de módulos específicos como un control deslizante, un cargador, un widget, y básicamente cualquier cosa en ese sentido. Por lo general, hay muchos archivos en componentes / ya que todo el sitio / aplicación debe estar compuesto principalmente por pequeños módulos.

## 6. Pages

Si tiene estilos específicos de página, es mejor colocarlos en una carpeta `pages /`, en un archivo con el nombre de la página. Por ejemplo, no es raro tener estilos muy específicos para la página de inicio, de ahí la necesidad de un archivo `_home.scss` en`páginas /`.

- Nota: Dependiendo de su proceso de implementación, estos archivos se pueden invocar solos para evitar fusionarlos con los demás en la hoja de estilo resultante. Realmente depende de ti.\*

## 7. Theme

En sitios y aplicaciones grandes, no es inusual tener diferentes temas. Ciertamente, hay diferentes formas de tratar los temas, pero personalmente me gusta tenerlos todos en una carpeta `themes /`.

- Nota: esto es muy específico del proyecto y es probable que no exista en muchos proyectos. \*

Reference: [Sass Guidelines](http://sass-guidelin.es/) > [Architecture](http://sass-guidelin.es/#architecture)
