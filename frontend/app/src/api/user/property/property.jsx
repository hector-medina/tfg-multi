export const NormalizeProperty = ({data={}}) => {

    const property = {};
    property.name = data.name;
    property.owner = data.owner;
    property.neighborhood = data.neighborhood;
    
    return property;
}

export const NormalizePropertyEdit = ({data={}}) => {

    var property = NormalizeProperty({data: data});
    
    for (var key in property) {
        if (property[key] === undefined) {
            delete property[key];
        }
    }

    return property;
}