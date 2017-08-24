export default{
    props:{
        relates:{
            type:Object,
            default:function(){
                return {}
            }
        },
        uri:{
            type:String,
            required:true,
        },
        labelfield:{
            type:String,
            default:'label',
        },
        valuefield:{
            type:String,
            default:'value',
        },
    },
    methods:{
        getOptions(){
            if(!this.hasValidIds || this.hasCachedOptions){
                return;
            }

            let keys = this.cacheKeys;
            let query = keys.reduce(function(obj,item){
                obj[this.relates[item]['field']?this.relates[item]['field']:item] = this.relates[item]['value'];
                return obj;
            }.bind(this),{})

            this.$axios.get(this.uri,{params:query}).then((json)=>{
                this.setCacheOptions(json.data.data);
            });
        },
        setCacheOptions(options){
            let keys = this.cacheKeys;
            let start = this.optionsCache;
            let counter = 0;
            let len = keys.length;
            while(counter<len-1){
                let cacheKey = this.relates[keys[counter++]]['value'];
                if(!start.hasOwnProperty(cacheKey)){
                    this.$set(start,cacheKey,{});
                }
                
                start = start[cacheKey];
            }
            this.$set(start,this.relates[keys[len-1]]['value'],options);
        },
    },
    computed:{
        cacheKeys(){
            return Object.keys(this.relates);
        },
        finalOptions(){
            if(!this.hasValidIds || !this.hasCachedOptions ){
                return [];
            }
            let keys = this.cacheKeys;
            let length = keys.length;
            let counter = 0;
            let start = this.optionsCache;
            while(counter<length){
                start = start[this.relates[keys[counter++]]['value'] ];
            }
            return start;
        },
        allOptions(){
            let keys = this.cacheKeys;
            let length = keys.length;
            let level = 0;
            let rst = [];
            

        },
        hasValidIds(){
            let keys = this.cacheKeys;
            let len = keys.length;
            let counter = 0;
            while(counter < len){
                let relateId = this.relates[keys[counter]]['value'];
                let inValidValue = this.relates[keys[counter]]['inValidValue']
                if(relateId === inValidValue){
                    return false;
                }
                counter++;
            }

            return true;
        },
        hasCachedOptions(){
            let start = this.optionsCache;
            let keys = this.cacheKeys;
            let len = keys.length;
            let counter = 0;
            let relateId;

            while(counter<len){
                relateId = this.relates[keys[counter++]]['value'];
                if(!start.hasOwnProperty(relateId)){
                    return false;
                }

                start = start[relateId];
            }
            return true;
        },
    },
    data(){
        return {
            optionsCache:{},
        }
    },
    watch:{
        relates:{
            handler:'getOptions',
            deep:true,
            immediate:true
        },
    },
}