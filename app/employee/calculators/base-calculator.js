function rtv() {
    return {
        apply: function (employee, pay) {
            return 0;
        },
        newPay: function (employee, pay) {
            return pay - this.apply(employee, pay);
        }
    }
}

module.exports = rtv;