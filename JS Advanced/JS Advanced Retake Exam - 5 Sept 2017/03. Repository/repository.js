

class Repository {
    constructor(props) {
        this.props = props;
        this.data = new Map();

        this.id = 0;
        this.getNextId = () => this.id++;
    }

    _validateEntity(entity) {
        let entityPropNames = Object.getOwnPropertyNames(entity)
        let validationPropNames = Object.getOwnPropertyNames(this.props)

        entityPropNames.forEach(entityName => {
            if (!validationPropNames.includes(entityName)) {
                throw Error(`Property ${propName} is missing from the entity!`)
            }
            else if (typeof entity[entityName] !== this.props[entityName]) {
                throw Error(`Property ${propName} is of incorrect type!`)
            }
        })
    }

    _validateEntityID(id) {
        if (!this.data.has(id)) {
            throw Error(`Entity with id: ${id} does not exist!`)
        }
    }

    add(entity) {
        this._validateEntity(entity)
        let nextId = this.getNextId();
        this.data.set(nextId, entity);
        return nextId;
    }

    get(id) {
        this._validateEntityID(id)
        return this.data.get(id);
    }

    update(id, newEntity) {
        this._validateEntityID(id)
        this._validateEntity(newEntity)
        this.data.set(id, newEntity);
    }

    del(id) {
        this._validateEntityID(id)
        this.data.delete(id);
    }

    get count() {
        return this.data.size;
    }
}