
cc.Class({
    extends: cc.Component,

    properties: {
        item:cc.Prefab,
        content:cc.Node,
        view:cc.Node,
        scrollView:cc.Node,
    },
    // onLoad () {},

    start () {
        this.initData()
        this.initScrollView()
        this.scrollView.on("scrolling",this.onScrollingEvent,this)
        this.scrollView.on("scroll-began",this.onScrollBeganEvent,this)
    },


    initData(){
        var item =  cc.instantiate(this.item)
        this.m_itemHeight = item.height 
        this.m_spaceY = 5
        this.m_itemSpaceTotal = this.m_itemHeight + this.m_spaceY
        this.m_contentHeight = this.content.height
        console.log("this.m_itemSpaceTotal = ",this.m_itemSpaceTotal)
        console.log("this.m_contentHeight = ",this.m_contentHeight)
        this.m_itemNum = parseInt(this.m_contentHeight /  this.m_itemSpaceTotal) + 1
        this.m_items = []
        this.m_scrollViewdata = []
      
        this.m_lastY = 0
        this.m_itemId = this.m_itemNum
        this.m_upIndex = 0
        for(let i =0;i < 1000; ++i){
            this.m_scrollViewdata.push(i)
        }
    },

    initScrollView(){
        var itemLength = this.m_itemNum > this.m_scrollViewdata.length ? this.m_scrollViewdata.length : this.m_itemNum
        this.content.height = itemLength * this.m_itemSpaceTotal
        for(let i=0; i< itemLength; ++i){
            let item = cc.instantiate(this.item)
            item.parent = this.content
            item.x = 0
            item.y = -( i * (this.m_itemSpaceTotal))
            console.log(item.x,item.y)
            item.getComponent("Item").setData(this.m_scrollViewdata[i])
            this.m_items.push(item)
        }
    },

    onScrollingEvent(){
        this.m_isMove = true
    },

    onScrollBeganEvent(){
        this.m_lastY = this.content.y
    },

    update (dt) {
        this.m_isMoveUp =this.content.y > this.m_lastY 
        if(this.m_lastY != this.content.y){
            this.m_lastY  = this.content.y
        }
        if(this.m_isMove){
            this.m_isMove = false
            if(this.m_isMoveUp){
                this.updateMoveDown()
            }else{
                this.updateMoveBottom()
            }
        }
    },

    updateMoveDown(){
        for(let i=0; i<this.m_itemNum; ++i){
           let listPosition = this.content.convertToWorldSpaceAR(this.m_items[i].position)
           listPosition = this.view.convertToNodeSpaceAR(listPosition)
           if((listPosition.y - this.m_itemSpaceTotal) - this.view.height / 2 > 0){
                this.content.height =   this.content.height + this.m_itemSpaceTotal
                this.m_items[i].y =-( this.m_itemId * (this.m_itemSpaceTotal))
                this.m_itemId ++
                this.m_upIndex ++
                this.m_items[i].getComponent("Item").setData(this.m_scrollViewdata[this.m_itemNum + this.m_upIndex -1])
           }
        }
    },

    updateMoveBottom(){
        for(let i=0; i<this.m_itemNum; ++i){
            let listPosition = this.content.convertToWorldSpaceAR(this.m_items[i].position)
            listPosition = this.view.convertToNodeSpaceAR(listPosition)
            if( listPosition.y < -(this.view.height /2) && this.m_upIndex > 0){
                this.m_items[i].y +=( this.m_itemNum * (this.m_itemSpaceTotal))
                var currentData = this.m_itemNum + this.m_upIndex -1
                this.m_itemId --
                this.m_upIndex --
                this.m_items[i].getComponent("Item").setData(this.m_scrollViewdata[currentData - this.m_itemNum])
            }
         }
    }

});
