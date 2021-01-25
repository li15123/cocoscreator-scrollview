
cc.Class({
    extends: cc.Component,

    properties: {
        label:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    setData(data){
        this.label.string = data
    }
    // update (dt) {},
});
