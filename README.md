# Sistema de Mesa de Ayuda (Help Desk) - Web Application

Este repositorio contiene el desarrollo de la aplicación web para un sistema de **Mesa de Ayuda (Help Desk)**. El objetivo principal del proyecto es centralizar, gestionar y optimizar el control de incidencias y solicitudes técnicos, permitiendo un flujo eficiente entre los usuarios finales y el equipo de sistemas (Nivel 1, Nivel 2 y Nivel 3).

---

## Estado del Proyecto: En Desarrollo
El proyecto se encuentra actualmente en fase de construcción. 

### Próximos pasos y tareas pendientes:
- [ ] Finalizar la lógica de asignación automática de tickets en el Backend.
- [ ] Añadir reportes gráficos del estado de las incidencias en tiempo real.

---

## Tecnologías y Herramientas Utilizadas

El sistema está construido bajo una arquitectura moderna, separando el diseño de la interfaz de la lógica de procesamiento y almacenamiento:

### **Frontend & UI**
* **HTML5 & CSS3:** Estructuración de vistas y estilos personalizados.
* **JavaScript (Vanilla JS):** Manipulación del DOM, control de eventos y consumo de APIs de manera asíncrona.
* **Bootstrap:** Framework CSS para garantizar un diseño responsivo, limpio y adaptable a dispositivos móviles.

### **Backend & Cloud Computing**
* **AWS Lambda / Funciones Serverless:** Arquitectura orientada a eventos para procesar las peticiones del frontend de forma escalable y sin necesidad de gestionar servidores tradicionales.

### **Base de Datos & Infraestructura**
* **SQL Server (SSMS):** Motor de base de datos relacional utilizado para el modelado de tablas, relaciones, triggers y procedimientos almacenados.
* **Microsoft Azure:** Despliegue de la base de datos en la nube, expuesta mediante una **IP Pública** configurada de manera segura para permitir la conexión directa de los servicios de backend.

---

## Arquitectura de Conexión (Flujo de Datos)

El flujo de información del sistema sigue el siguiente esquema técnico:
1. **Usuario:** Interactúa con la interfaz web (**HTML/Bootstrap**).
2. **Frontend:** Realiza peticiones asíncronas (**JavaScript Fetch**) hacia los endpoints.
3. **Lógica de Negocio:** Las funciones **AWS Lambda** procesan la solicitud.
4. **Persistencia:** La Lambda se conecta a la base de datos **SQL Server** alojada en **Azure** a través de su IP pública para consultar o registrar la información.

---

## Autor
Gerson Ronaldo Surco Alata - www.linkedin.com/in/gerson-surco-alata-53b42026a
