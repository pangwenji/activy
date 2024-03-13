import { ref } from "vue"

const activity = ref<() => void>();
export const activityInit = (fn?:() => void) => {
    if(fn){
        activity.value = fn;
    }else{
        activity.value && activity.value();
    }
}


const agent = ref<() => void>();
export const agentInit = (fn?:() => void) => {
    if(fn){
        agent.value = fn;
    }else{
        agent.value && agent.value();
    }
}

const game = ref<() => void>();
export const gameInit = (fn?:() => void) => {
    if(fn){
        game.value = fn;
    }else{
        game.value && game.value();
    }
}