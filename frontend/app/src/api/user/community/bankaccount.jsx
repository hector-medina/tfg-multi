export const NormalizeBankAccount = ({data={}}) => {

    const bankaccount = {};
    bankaccount.name = data.bankaccount_name;
    bankaccount.number = data.bankaccount_number;

    return bankaccount;
}

export const NormalizeBankAccountEdit = ({data={}}) => {

    const bankaccount = {};
    bankaccount.name = data.bankaccount_name;
    bankaccount.number = data.bankaccount_number;

    for (var key in bankaccount) {
        if (bankaccount[key] === undefined) {
            delete bankaccount[key];
        }
    }

    return bankaccount;
}