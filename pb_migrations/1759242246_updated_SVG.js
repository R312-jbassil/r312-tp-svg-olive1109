/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2596568427")

  // remove field
  collection.fields.removeById("editor1807006754")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "json1807006754",
    "maxSize": 0,
    "name": "chat_history",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2596568427")

  // add field
  collection.fields.addAt(2, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor1807006754",
    "maxSize": 0,
    "name": "chat_history",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // remove field
  collection.fields.removeById("json1807006754")

  return app.save(collection)
})
