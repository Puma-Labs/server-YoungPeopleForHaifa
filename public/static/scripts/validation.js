function validation(vl) {
    let values = []
    vl.map((item, index) => {
        values[index] = $(`${item.id}`).val()
    })

    let error = {status: true}

    for(let v = 0; v < values.length; v++) {
        const value = values[v]
        const vld = vl[v]
        const $searchEl = $(`${vld.id}`)
        for(let r = 0; r < vl[v].rules.length; r++) {
            const rule = vld.rules[r]
            const stat = rules[rule.rule]({value, vld})
            let $label = $searchEl.closest('label')
            if($searchEl.length > 1) $label = $searchEl.closest('.radio-input, .input-group, .input-group-col');
            if(!stat) {
                if(typeof rule.msg !== 'function') {
                    $label.find('.err-message').remove()
                    const msgPosition = rule.msgStyle === 'center' ? 'style="width: 100%; text-align: center"' : ''
                    $label.append(`<div class="err-message" ${msgPosition}>${rule.msg}</div>`)
                    $label.find('.input-container').addClass('error')
                }
                typeof rule.msg === 'function' && rule.msg({status: false, id: vld.id, rules: rule.rule})
                error = {status: false, id: vld.id, rules: rule.rule}
            } else {
                typeof rule.msg === 'function' && rule.msg({status: true, id: vld.id, rules: rule.rule})
                $label.find('.input-container').removeClass('error')
                $label.find('.err-message').remove()
            }
        }
    }
    return error;
}

class rules {
    static isRequired = ({value}) => {
        return value !== '';
    }

    static isZero = ({value}) => {
        value = `${value}`.replace(/,/g , "") ?? 0
        console.log(+value, +value  > 0)
        return +value > 0
    }

    static isGreater = ({value}) => {
        const listVal = value.split('#/#')
        return listVal[0] > listVal[1]
    }

    static isChecked = ({vld}) => {
        return $(`${vld.id}`).is(':checked')
    };

    static isPhone = ({value, vld}) => {
        return /^(\+61[\- ]?)?(\(?\d{3}\)?[\- ]?)(\(?\d{3}\)?[\- ]?)(\(?\d{3}\)?[\- ]?)$/.test(
            value,
        );
    };

    static searchSelect = ({value, vld}) => {
        const dataSelect = $(`${vld.id}`).attr('data-selected')
        return dataSelect === true || dataSelect === 'true'
    }

    static isEmail = ({value}) => {
        return /^([aA-zZ0-9_-]+\.)*[aA-zZ0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(
            value,
        );
    };
}
