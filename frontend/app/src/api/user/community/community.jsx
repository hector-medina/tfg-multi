export const NormalizeCommunity = ({data={}}) => {

    const community = {};
    community.name = data.community_name;
    community.admin = data.admin;
    community.president = data.president;
    community.address = data.community_address;
    community.bank_account = data.bank_account;

    return community;
}

export const NormalizeCommunityEdit = ({data={}}) => {

    const community = {};
    community.name = data.community_name;
    community.admin = data.admin;
    community.president = data.president;
    community.address = data.community_address;
    community.bank_account = data.bank_account;

    for (var key in community) {
        if (community[key] === undefined) {
            delete community[key];
        }
    }

    return community;
}