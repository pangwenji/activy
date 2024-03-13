import { dbGet } from "./db";
import { open } from "../router/routes";
import { locationOrigin } from "./async.var";
import { RouterKeys } from "../@types/router.config";



/**
 * 打开游戏
 * @param item {Games}
 */
export const openGame = (item: Games) => {
    dbGet('user').then(_user => {
        '/api/game/login'.POST<GameLogin>({
            game_id: item.id,
            game_company_code: item.game_company_code,
            home_url: locationOrigin.value
        }, {
            Authorization: async () => await dbGet('token')
        }).then(ret => {
            '/api/game/addRecordGame'.POST<AddRecordGame>({
                gid: item.id
            }, { Authorization: async () => await dbGet('token') })
            open('/customer-service', { url: ret.url })
        })
    }).catch(() => {
        open<'/login'>('/login' as RouterKeys as '/login');
    });
}