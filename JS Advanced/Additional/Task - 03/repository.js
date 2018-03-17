
class Repository {
    constructor(props) {
        this.props = props;
        this.data = new Map();

        let id = 0;
        this._getNextId = () => id++;
    }

    get count() {
        return this.data.size;
    }

    add(entity) {
        this._checkEntityMembers(entity);
        let newId = this._getNextId();
        this.data.set(newId, entity);
        return newId;
    }

    get(id) {
        this._checkIdExistence(id);
        return this.data.get(id);
    }

    update(id, newEntity) {
        this._checkIdExistence(id);
        this._checkEntityMembers(newEntity);
        this.data.set(id, newEntity);
    }

    del(id) {
        this._checkIdExistence(id);
        this.data.delete(id);
    }

    _checkIdExistence(id) {
        if (this.data.has(id) === false) {
            throw Error(`Entity with id: ${id} does not exist!`);
        }
    }

    _checkEntityMembers(entity) {
        let propNames = Object.getOwnPropertyNames(this.props);
        let entityPropNames = Object.getOwnPropertyNames(entity)

        entityPropNames.forEach(propName => {
            let typeProp = this.props[propName];
            let entityProp = entity[propName];

            if (typeProp === undefined) {
                throw Error(`Property ${propName} is missing from the entity!`);
            }
            else if (typeof entityProp !== typeProp) {
                throw Error(`Property ${propName} is of incorrect type!`);
            }
        });
    }
}
