# backend-entrega-5

Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:

a) un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir POST, y redirigir al mismo formulario)

b) Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.

c) Ambas páginas contarán con un botón que redirija a la otra.

# Consigna

2. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.

3. Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.

4. Por escrito, indicar cuál de los tres motores prefieres para tu proyecto y por qué.

# Aspectos a incluir en el entregable

- Realizar las plantillas correspondientes que permitan recorrer el array de productos y representarlo en forma de tabla dinámica, siendo su cabeceras el nombre de producto, el precio y su foto (la foto se mostrará como una imágen en la table)
- En el cso de no encotnrarse datos, mostrar el mensaje 'No hay productos'

# Sugerencias

- Utilizar iconfinder(https://www.iconfinder.com/free_icons) para obtener la url de las imágenes de los productos (click derecho sobre la imagen > copiar la dirección de la imagen)
