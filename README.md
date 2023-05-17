# Backend-39770 

» La clase ProductManager tiene varios métodos para agregar, actualizar, eliminar y obtener productos de la lista. El método addProduct toma como argumento un objeto que describe un producto y lo agrega a la lista de productos. Si la lista ya tiene productos, asigna un nuevo ID al producto agregado. Luego, escribe la lista de productos actualizada en el archivo.

» El método getProducts devuelve una lista de todos los productos almacenados en la lista de productos.

» El método getProductById busca y devuelve un producto específico en la lista de productos según su ID. Si el producto no se encuentra, devuelve un mensaje que indica que no se encontró el producto.

» El método updateProduct actualiza los datos de un producto específico en la lista de productos. Si el producto no se encuentra en la lista, devuelve un mensaje que indica que el producto no se encontró. Luego, escribe la lista de productos actualizada en el archivo.

» El método deleteProduct elimina un producto específico de la lista de productos según su ID. Si el producto no se encuentra en la lista, devuelve un mensaje que indica que el producto no se encontró. Luego, escribe la lista de productos actualizada en el archivo.

» Se creo una clase nueva para agregar carts al proyecto, con sus metodos correspondientes.

» Se creo un servidor y se configuro para poder levantar todo desde npm run dev, desde el json.

» Dentro del localhost se configuraron los endpoint para ver los productos y los carts y en caso contrario que muestre un mensaje de error

» Tambien se establecienron los querys de limit para que muestre la cantidad que el usuario determine.

» Por ultimo se configuro un endpoint para los productos (/:pid) y para los carts (/:cip) para que muestre el id buscado. 


» Creamos routes en el cual ingresamos products_route y cart_route

» Configuramos los managers para poder realizar diversas funciones

» Configuramos los middlewares para poder manejar los distintos errores.
