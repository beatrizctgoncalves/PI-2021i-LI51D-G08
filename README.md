# PI-2021i-LI51D-G08

# Covida API

The base part of the URI path for the Covida API is `/covida`.

The following sections describe each API resource.

--

## Check the API

```http
GET /
```

```curl
curl http://localhost:8080/covida/
```

- Request:
  - Body: none
- Response:
  - Success:
    - Status code: 200 OK
    - Body example:

    ```json
      {
          "name": "Covida api",
          "version": "1.0.0",
          "description": "PI Covida API running"
      }
      ```

---

## List most popular games

```http
GET /games
```

```curl
curl http://localhost:8080/covida/games
```

- Request:
  - Body: none
- Response:
  - Success:
    - Status code: 200 OK
    - Body example:

    ```json
        {
         "id": 70,
         "name": "Terra Nova: Strike Force Centauri"
         },
         {
         "id": 40104,
         "name": "Dogou Souken"
        },
    ```

---

## Search games by name 

```http
GET /games/{name}
```

```curl
curl http://localhost:8080/covida/games/Halo
```

- Request:
  - Path parameters:
    - name: The game's name
  - Body: none  
- Response:
  - Success:
    - Status code: 200 OK
    - Body:

    ```json
        {
         "id": 740,
         "collection": 173,
         "name": "Halo: Combat Evolved"
         },
        {
         "id": 6803,
         "collection": 173,
         "name": "Halo 5: Guardians"
        },
        {
         "id": 7348,
         "collection": 173,
         "name": "Halo: The Master Chief Collection"
        },
        ...
    ```
- Errors:
    - 400 and 404 (see Common Error Handling section )
     
---
# Manage favorite groups

-- 

##  Create group assigning a name and description

```http
POST /groups
```

```curl 
curl http://localhost:8080/covida/groups        \
  -X POST                                   \
  -H 'Content-type: application/json'       \
  -d '{                                     \
    "name": "Game",                        \
    "description": "description of game"  \
  }' 
```

- Request:
  - Body:
```json
  {
    "name": "Game",
    "description": "description of Game"
  },  
```
- Response:
  - Success:
    - Status code: 201 Created
    - Headers:
      - 
    - Content-Type: application/json
    - Body example:
 
    ```json
      Falta coisas aqui como no headers
    ```
  - Errors:
    -  400
---   

## Update group changing name and description

```http
POST /groups/{groupId}
```

```curl
curl http://localhost:8080/covida/groups/2         \
    -X PUT                                     \
    -H 'Content-type: application/json'        \
    -d '{                                      \
      "name": "task11",                        \
      "description": "description of task 11", \
      "foo": 123234                            \
    }'  
```
- Request:
  - Body:
    - groupId - The group identifier
```json
  {
    "name": "Game",
    "description": "description of Game"
  },  
```
- Response:
  - Success:
    - Status code: 200 OK
    - Content-Type: application/json
    - Body example:
 
    ```json
      Falta coisas aqui 
    ```
  - Errors:
    - 400 and 404 (see Common Error Handling section )

---

## List all groups

```http
GET /groups
```

```curl
curl http://localhost:8080/covida/groups   
```

- Request:
  - Body: none
- Response:
  - Success:
    - Status code: 200 OK
    - Body example:

    ```json
      {
        
      }
      ```

---

## Obtain group details  

```http
GET groups/{groupId}
```

```curl

```

## Add a game to group

```http
PUT groups/{groupId}/games/{gameId}
```

## Remove a game from group 

```http 
DELETE groups/{groupId}/games/{gameId}
```

## Obtain games with total rating beteween two values

```http
GET groups/{groupId}/{min}/{max}


