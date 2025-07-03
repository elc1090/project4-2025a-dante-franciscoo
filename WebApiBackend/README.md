
# 📦 BACKEND - WebApiBackend

## 📘 Descrição

Esta Web API é uma API RESTful desenvolvida com **ASP.NET Core**, que fornece funcionalidades de gerenciamento de recursos ao frontend do site do projeto.

O backend segue a arquitetura **MVC (Model-View-Controller)** e oferece controle de acesso aos seguintes recursos:

- 👤 **Usuários**
- 🧭 **Roadmaps de aprendizado em programação**
- 🤖 **Interação limitada com uma API de Inteligência Artificial**

---

## 📑 Documentação da API

### 🤖 AIApi

#### ➤ `POST /api/AIApi/SendPrompt`

Envia um prompt de texto para a IA e retorna a resposta gerada.

- **Headers:**
  ```http
  Accept: application/json
  Content-Type: application/json
  ```

- **Request Body:**
  ```json
  {
    "prompt": "string"
  }
  ```

- **Response:**
  ```json
  {
    "Response": "string"
  }
  ```

---

### 🧭 RoadMap

#### ➤ `GET /api/RoadMap/GetRoadMap`

Retorna todos os roadmaps cadastrados.

- **Headers:**
  ```http
  Accept: application/json
  ```

- **Response:**
  ```json
  [
    {
      "id": 1,
      "userid": 1,
      "name": "string",
      "roadmap": "string",
      "tags": [
        { "id": 1, "name": "string", "description": "string" }
      ]
    }
  ]
  ```

---

#### ➤ `GET /api/RoadMap/GetRoadMap/{id}`

Obtém um roadmap específico pelo seu ID.

- **Headers:**
  ```http
  Accept: application/json
  Authorization: Bearer {token}
  ```

- **Path Parameter:**
  - `id`: integer (obrigatório)

- **Response:**
  ```json
  {
    "id": 1,
    "userid": 1,
    "name": "string",
    "roadmap": "string",
    "tags": [{},{}],
    "isOwner": false
  }
  ```

---

#### ➤ `POST /api/RoadMap/PostRoadMap` 🛡️

Cria um novo roadmap.

- **Request Body:**
  ```json
  {
    "userid": 10,
    "name": "Novo Roadmap",
    "roadmap": "..."
  }
  ```

- **Response:**
  ```json
  {
    "userid": 10,
    "name": "Novo Roadmap",
    "roadmap": "..."
  }
  ```

---

#### ➤ `PUT /api/RoadMap/PutRoadMap/{id}` 🛡️

Atualiza um roadmap existente.(Somente o usuário que criou pode realizar)

- **Path Parameter:**
  - `id`: integer (obrigatório)

- **Request Body:**
  ```json
  {
    "id": 1,
    "userid": 10,
    "name": "Nome atualizado",
    "roadmap": "..."
  }
  ```

- **Response:**
  ```
  200 OK
  ```

---

#### ➤ `DELETE /api/RoadMap/DeleteRoadMap/{id}` 🛡️

Remove um roadmap pelo ID.(Somente o usuário que criou pode realizar)

- **Path Parameter:**
  - `id`: integer (obrigatório)

- **Response:**
  ```
  200 OK
  ```

---

### 👤 User

#### ➤ `GET /api/User/GetUser`

Retorna a lista de usuários cadastrados.

- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "string"
    }
  ]
  ```

---

#### ➤ `GET /api/User/GetUser/{id}`

Busca um usuário pelo ID.

- **Response:**
  ```json
  {
    "id": 1,
    "name": "string"
  }
  ```

---

#### ➤ `POST /api/User/Register`

Registra um novo usuário.

- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **Response:**
  ```json
  {
    "token": "string"
  }
  ```

---

#### ➤ `POST /api/User/Login`

Autentica um usuário e retorna um token JWT.

- **Request Body:**
  ```json
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```

- **Response:**
  ```json
  {
    "token": "string"
  }
  ```

---

#### 📝 Editar Usuário 🛡️

##### ➤ `PUT /api/User/PutUser/{id}`

Atualiza informações de um usuário.

- **Path Parameter:**
  - `id`: integer (obrigatório)

- **Request Body:**
  (igual ao de registro, com `id` incluso)

- **Response:**
  ```
  200 OK
  ```

---

#### 🗑️ Deletar Usuário 🛡️

##### ➤ `DELETE /api/User/DeleteUser/{id}`

Remove um usuário pelo ID.

- **Response:**
  ```
  200 OK
  ```

---

> 🛡️ **Nota:** Algumas rotas exigem autenticação JWT. Envie o token no header:  
> `Authorization: Bearer {seu_token}`
