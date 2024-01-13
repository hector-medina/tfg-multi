# Community
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

Este repositorio contiene el desarrollo del TFG (Trabajo Final de Grado) de los estudios de Grado en Ingeniería Informática impartido en la Universitat Oberta de Catalunya (UOC).

Community es una aplicación multiplataforma desarrollada en React Native con un backend basado en Django Rest Framework.

## Tabla de contenido

<ol>
  <li><a href="#demo">Demo</a</li>
  <li><a href="#entorno-desarrollo">Entorno de desarrollo</a</li>
  <li><a href="#uso">Uso</a</li>
  <li><a href="#licencia">Licencia</a</li>
  <li><a href="#contacto">Contacto</a</li>
</ol>

<!-- ABOUT THE PROJECT -->
## Demo
<p style = 'text-align:center;'>
  <img src="./docs/IMG_8709.PNG" alt="community" height="300px">
  <img src="./docs/IMG_8705.PNG" alt="community" height="300px">
  <img src="./docs/IMG_8708.PNG" alt="community" height="300px">
  <img src="./docs/IMG_8706.PNG" alt="community" height="300px">
  <img src="./docs/IMG_8707.PNG" alt="community" height="300px">
</p>

Para acceder al demo se requiere un terminal móvil y tener instalada la aplicación `Expo Go`. 

### Versión iOS

Accede a `exp://u.expo.dev/update/c1665fa1-e223-480d-a297-46ceb450bf67` o escanea el siguiente código.

<p style = 'text-align:center;'>
  <img src="./docs/demo-ios.png" alt="demo-ios-qr-code" height="200px">
</p>

### Versión Android

Accede a `exp://u.expo.dev/update/139b0251-5f02-480e-afbe-1d1234ce3e76` o escanea el siguiente código.

<p style = 'text-align:center;'>
  <img src="./docs/demo-android.png" alt="demo-ios-qr-code" height="200px">
</p>



## Entorno de desarrollo

### Dependencias.

Para poder utilizar el entorno de desarrollo se necesitará de lo siguiente:

- Docker version 24.0.2 o compatible.
- Docker Compose version v2.19.1 o compatible.
- npm version 9.8.1 o compatible.
- Aplicación `Expo Go` en un dispositivo móvil.

### Instalación.

Se deberán seguir los siguientes pasos:

#### Clonar el repositorio.

````
git clone https://github.com/hector-medina/tfg-multi.git
````

#### Descargar dependencias.

En el directorio del proyecto `/frontend/app`:

````
npm install
````

#### Desplegar backend.

En el directorio del proyecto `/backend`

````
docker compose up
````

#### Desplegar frontend.

Debemos indicar la IP del backend que utilizará el frontend con los datos de nuestra máquina. Para ello debemos modificar el fichero `/frontend/app/app.json`, cambiando el valor de la variable `API_URL`:

````
    "extra": {
      "API_URL": "http://192.168.100.17"
    }
````

En el directorio del proyecto `/frontend/app`

````
npx expo start
````

### Uso.


## License

Distributed under the MIT License. 




<!-- CONTACT -->
## Contact

Hector Mario Medina Cabanelas

Linkedin: [https://www.linkedin.com/in/hector-medina-cabanelas/](https://www.linkedin.com/in/hector-medina-cabanelas/)

Email: hector.medina.cabanelas@gmail.com


[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: /LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/hector-medina-cabanelas/
