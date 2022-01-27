### Mongoose
-> provides mongodb object mapping
-> provides interaction with mongodb using ORM
    -> ORM = Object Relation Mapping
-> provides a schema based solution model for our app data.
    -> Schema -> Structure for our collection. we define the type and validation here
    -> Model -> constructors compiled from our schema definition. creates the collection in the db
    -> every model has their own collection
    -> model name should be singular. collection name must be plural
### installation
-> npm install mongoose express