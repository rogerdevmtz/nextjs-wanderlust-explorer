# Wanderlust Explorer

Explorador de viajes creado para el reto de React y Next.js de 4Geeks Academy. Permite descubrir 100 experiencias de demostración, compartir una búsqueda por URL y guardar favoritos durante la visita.

## Ejecutar en local

Requiere Node.js 20.9 o superior y npm. Desde la raíz del proyecto:

```bash
npm ci
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Para comprobar la versión de producción, ejecuta `npm run lint`, `npm run build` y `npm start`.

## Rutas

| Ruta | Función |
| --- | --- |
| `/` | Portada con acceso al catálogo, categorías y experiencias destacadas |
| `/experiences` | Catálogo con buscador por título y filtros por categoría y ciudad o país |
| `/experiences/[id]` | Detalle, precio, valoración y acceso a favoritos |
| `/favorites` | Colección de experiencias guardadas |
| `/profile` | Perfil simulado y contador de favoritos |

## Buscar, compartir y guardar

Puedes abrir [este ejemplo prefiltrado](http://localhost:3000/experiences?search=vela&category=adventure&destination=Croatia) para ver la experiencia de vela de Hvar. La búsqueda aplica una expresión regular sin distinción entre mayúsculas y minúsculas, admite términos sin tilde y trata los caracteres especiales como texto. Se combina con ambos filtros. El botón de limpiar vuelve a mostrar todo el catálogo.

El hook `useExperiences` lee la URL con `useSearchParams`, construye la ruta con `usePathname` y actualiza los parámetros sin recargar. El efecto de `SearchBar` alinea el contenido del campo con los cambios de URL, incluidos los del historial.

Los favoritos se guardan en el `useState` del proveedor del layout, se comparten entre rutas y se pasan a cada tarjeta como props. Una recarga inicia una colección vacía, tal como define el alcance del reto.

## Design References

- [GetYourGuide](https://www.getyourguide.com/) inspiró la navegación por categorías y la organización de un catálogo con accesos directos.
- [Viator](https://www.viator.com/) inspiró la jerarquía de las tarjetas, con destino, valoración y precio fáciles de comparar.
- [Ocean Crest](https://ocean-crest.webflow.io/) inspiró el ritmo entre fotos panorámicas, composiciones editoriales y selección horizontal. Se adaptó al catálogo de Wanderlust con imágenes propias y movimiento reducido cuando lo pide el sistema.

Las maquetas de Wanderlust Explorer en Stitch guiaron la paleta marítima, el uso de Newsreader y Manrope y la composición de la portada, las fichas y la bitácora.

El dataset está tipado en `src/data/experiences.ts` y se generó con asistencia de IA. Los precios, las valoraciones y el perfil son ficticios. Las fotografías ilustrativas de `public/images` se generaron con ImageGen y se sirven en WebP.

## Comprobación rápida

1. Entra desde Inicio y comprueba que el explorador muestra las 100 experiencias.
2. Abre el ejemplo prefiltrado y revisa los campos. Cambia el destino o la categoría, usa Atrás y comprueba que los controles y la URL se actualizan juntos.
3. Busca un título inexistente y usa el botón para volver al catálogo completo.
4. Guarda una experiencia, abre su detalle y comprueba que está en Favoritos y suma en Perfil. Quítala y verifica que el contador baja.
5. Abre una URL de detalle con un ID inexistente y vuelve al explorador desde la página de error.
