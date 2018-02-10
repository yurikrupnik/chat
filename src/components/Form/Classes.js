import _ , {every} from 'lodash';

const validationFunctions = {
    notEmptyString() {
        return this.value.length > 0;
    },
    hasSpaces() {
        return !this.value.includes(' ');
    },
    isValidForm(form) {
        return !every(form, val => val.validate());
    },
    getValidationState(isValid) {
        return isValid ? null : 'error';
    }
};


class StringField {
    constructor({
                    name,
                    label,
                    value,
                    placeholder,
                    validationArray,
                    overwriteError,
                    hidden,
                    bound,
                    onChange,
                    type
                }) {
        const defaultError = 'Required field';

        this.name = name || 'name';
        this.label = label || _.capitalize(this.name);
        this.value = _.isString(value) ? value : '';
        this.hidden = _.isBoolean(hidden) ? hidden : false;
        this.required = true;
        this.placeholder = placeholder || 'Enter Value';
        this.type = type || 'text';


        this.errors = overwriteError ? [defaultError, overwriteError] : [defaultError];
        this.validations = [
            validationFunctions.notEmptyString
        ];

        if (_.isArray(validationArray) && _.isFunction(_.head(validationArray))) {
            this.validations = _.reduce(validationArray, function (acc, next) {
                return acc.concat(next);
            }, this.validations);
        }

        this.error = _.head(this.errors);

        this.bound = bound ? bound : null;

        if (_.isFunction(onChange)) {
            this.onChange = onChange;
        }

    }

    validate() {
        return this.validations.every((validateFunc, i) => {
            const value = _.isFunction(validateFunc) && validateFunc.call(this);
            this.error = !value ? this.errors[i] : '';
            return value;
        })
    }

    onChange(model, event) {
        const {target} = event;
        const {value, name} = target;
        model.setState((prevState) => {
            return {
                modalFields: prevState.modalFields.map(val => {
                    if (val.name === name) {
                        val.value = value;
                        return val;
                    }
                    return val;
                })
            };
        });
    }
}

class NumberField {
    constructor({name, label, value, min, max, step, hidden, bound, onChange}) {
        this.name = name || 'name';
        this.label = label || 'Default label';
        this.value = _.isNumber(value) ? value : 0;
        this.hidden = _.isBoolean(hidden) ? hidden : false;
        this.required = true;
        this.placeholder = 'Enter number value';
        this.type = 'number';
        this.error = 'Not in Range';
        this.min = min || -Number.MAX_VALUE;
        this.max = max || Number.MAX_VALUE;
        this.step = step || 1;
        this.bound = bound ? bound : null;
        if (_.isFunction(onChange)) {
            this.onChange = onChange;
        }
    }

    validate() {
        return this.value <= this.max && this.value >= this.min;
    }

    onChange(model, event) {
        const {target} = event;
        const {value, name} = target;
        model.setState((prevState) => {
            return {
                modalFields: prevState.modalFields.map(val => {
                    if (val.name === name) {
                        val.value = value;
                        return val;
                    }
                    return val;
                })
            };
        });
    }
}

class IntegerField {
    constructor({name, label, value, min, max, step, hidden, bound}) {
        // super(name, label, value, min, max, step, hidden, bound);
        this.name = name || 'name';
        this.label = label || 'Default label';
        this.value = _.isNumber(value) ? value : 0;
        this.hidden = _.isBoolean(hidden) ? hidden : false;
        this.required = true;
        this.placeholder = 'Enter integer value';
        this.type = 'number';
        this.error = 'Not in Range';
        this.min = min || -Number.MAX_VALUE;
        this.max = max || Number.MAX_VALUE;
        this.step = step || 1;
        this.bound = bound ? bound : null;
    }

    validate() {
        return this.value <= this.max && this.value >= this.min && _.isInteger(_.toNumber(this.value));
    }

    onChange(model, event) {
        debugger;
        const {target} = event;
        const {value, name} = target;
        model.setState((prevState) => {
            return {
                modalFields: prevState.modalFields.map(val => {
                    if (val.name === name) {
                        val.value = value;
                        return val;
                    }
                    return val;
                })
            };
        });
    }
}

class SelectField {
    constructor({name, label, value, options, data, hidden, bound, onChange}) {
        this.name = name;
        this.label = label || 'Default label';
        this.value = value || '';
        this.hidden = _.isBoolean(hidden) ? hidden : false;
        this.required = true;
        this.placeholder = 'as';
        this.error = 'Required Field';
        this.type = 'select';
        this.options = options || [];
        this.data = data || [];
        this.bound = bound ? bound : null;
        if (_.isFunction(onChange)) {
            this.onChange = onChange;
        }
    }

    validate() {
        return this.options.map(v => v.value).includes(this.value);
    }

    onChange(model, name, value) {
        model.setState((prevState) => {
            return {
                modalFields: prevState.modalFields.map(val => {
                    if (val.name === name) {
                        val.value = value;
                        return val;
                    }
                    return val;
                })
            };
        });
    }
}

class BoolField {
    constructor({name, label, value, hidden, bound, onChange}) {
        this.name = name;
        this.label = label || 'Default label';
        this.value = _.isBoolean(value) ? value : true;
        this.hidden = _.isBoolean(hidden) ? hidden : false;
        this.required = true;
        this.placeholder = 'Check or Uncheck';
        this.error = 'Required field';
        this.type = 'checkbox';
        this.bound = bound ? bound : null;
        if (_.isFunction(onChange)) {
            this.onChange = onChange;
        }
    }

    validate() {
        return _.isBoolean(this.value);
    }

    onChange(model, event) {
        const {target} = event;
        const {checked, name} = target;
        model.setState((prevState) => {
            return {
                modalFields: prevState.modalFields.map(val => {
                    if (val.name === name) {
                        val.value = checked;
                        return val;
                    }
                    return val;
                })
            };
        });
    }
}

export default class FormHelpers {
    static createStringField(obj) {
        return new StringField(obj);
    }

    static createSelectField(obj) {
        return new SelectField(obj);
    }

    static createNumberField(obj) {
        return new NumberField(obj);
    }

    static createIntegerField(obj) {
        return new IntegerField(obj);
    }

    static createBoolField(obj) {
        return new BoolField(obj);
    }
}

export {
    validationFunctions
}