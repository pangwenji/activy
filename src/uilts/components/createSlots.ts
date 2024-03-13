import { defineComponent, h } from 'vue';
export default () => {
	return defineComponent({
		props:['vnode','index'],
		setup(props, ctx){
			
		},
		render(props:any, ctx:any){
			let node = props.vnode;
			let len = node.length;
			let arr = [];
			for(let i=0;i<len;i++){
				if(typeof props.vnode[i].type === 'string'){
					arr.push(h('div',{
						class:'public-swiper-item',
						style:('transform:translate(-' + (props.index * 100) + '%, 0px) translateZ(0px)'),
						[node[i].scopeId]:''
					},[node[i]]))
				}else if(typeof props.vnode[i].children != 'string'){
					let cnode = props.vnode[i].children;
					for(let k=0;k<cnode.length;k++){
						arr.push(h('div',{
							class:'public-swiper-item',
							style:('transform:translate(-' + (props.index * 100) + '%, 0px) translateZ(0px)'),
							[cnode[k].scopeId]:''
						},[cnode[k]]))
					}
				}
			}
			// props.vnode.children.map(item => {
			// 	return h('div',{
			// 		class:'public-swiper-item'
			// 	},[item])
			// })
			return arr;
		}
	});
}