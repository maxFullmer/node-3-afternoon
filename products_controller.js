module.exports = {
    create: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {name, description, price, image_url} = req.body;

        // utilize the SQL files which contain SQL methods that update database
        // on our newly created database instance
        dbInstance.create_product([name, description, price, image_url])
        .then( () => res.sendStatus(200) )
        .catch(err => {
            res.status(500).send( {error: 'something incorrect happened'})
            console.log(err)
        })
    },

    getOne: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { id } = req.params;

        dbInstance.read_product(id)
        // don't forget to add parameter to arrow function for GET requests
        // also add that parameter (response) to sendstatus with a .send(response)
        .then( product => res.status(200).send(product))
        .catch(err => {
            res.status(500).send( {error: 'something incorrect happened'})
            console.log(err)
        })        
    },

    getAll: (req, res, next) => {
        const dbInstance = req.app.get('db');

        dbInstance.read_products()
        .then( (products) => res.status(200).send(products))
        .catch(err => {
            res.status(500).send( {error: 'something incorrect happened'})
            console.log(err)
        })
    },

    update: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {id} = req.params;
        const {desc} = req.query;
        // add parameters and queries from the request into array.
        // this array will be used in the SQL files with $1, $2, ... to update the database
        dbInstance.update_product([id, desc])
        .then( () => res.sendStatus(200) )
        .catch(err => {
            res.status(500).send( {error: 'something incorrect happened'})
            console.log(err)
        })
    },

    delete: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const {id} = req.params;

        dbInstance.delete_product(id)
        .then( () => res.sendStatus(200) )
        .catch(err => {
            res.status(500).send( {error: 'something incorrect happened'})
            console.log(err)
        })
    }
}