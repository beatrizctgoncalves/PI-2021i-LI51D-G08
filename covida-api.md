# CIBORG API documentation

The base part of the URI path for the CIBORG API is `/./api`

The following sections describe each API endpoint.

Group 8

client_id: 
client_secret: 
redirect_uri: None Set

## Obtain all games

```http
GET /games
```

- Request:
  - Body: none
- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body example:

    ```json
      {
        "games": [
          {
            "id": 1,
            "name": "game1",
            "description": "description of game 1"
          },
          {
            "id": 2,
            "name": "bundle2",
            "description": "description of game 2"
          },
          ...
        ]
      }
    ```

---

## Obtain a specific game

```http
GET /games/:id
```

- Request:
  - Path parameters:
    - id - The game identifier
  - Body: none
- Response:
  - Success:
    - Status code: 200
    - Content-Type: application/json
    - Body:

    ```json
        {      
            "id": "identifier of game 1",
            "name": "game1",
            "gameCount": 1,
            "imageUrl": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1557163283998",
            "thumbUrl": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1557163283998",
            "images": {
                "thumb": "https://d2k4q26owzy373.cloudfront.net/40x40/games/uploaded/1557163283998",
                "small": "https://d2k4q26owzy373.cloudfront.net/150x150/games/uploaded/1557163283998",
                "medium": "https://d2k4q26owzy373.cloudfront.net/350x350/games/uploaded/1557163283998",
                "large": "https://d2k4q26owzy373.cloudfront.net/700x700/games/uploaded/1557163283998",
                "original": "https://s3-us-west-1.amazonaws.com/5cc.images/games/uploaded/1557163283998"
            }
        }
    ```

  - Errors:
    - 400 and 404 (see Common Error Handling section)

---

## Create a Group

```http
POST /groups
```

- Request:
  - Content-Type: application/json
  - Body:

