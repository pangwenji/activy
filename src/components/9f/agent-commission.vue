<template>
    <view class="content">
        <view class=" top-page">
            <public-loading v-if="isApiOk" class="public-loading-top"></public-loading>
            <div v-else>

                <div class="today-card-wrap">
                    <div class="title">{{ t('pageAgent.f1') }}
                        <public-svg class="icon cursor" icon="icon_Help" @click="setShowNewUserHelp"></public-svg>
                    </div>
                    <div class="line"></div>
                    <div class="item-wrap">
                        <div class='item'>
                            <span>{{ userTeam.agent_sub_data_today.team_reg_num }}</span>
                            <span>{{ t('pageAgent.f2') }}</span>
                        </div>
                        <div class='item'>
                            <span>{{ userTeam.agent_sub_data_today.new_reg_num ?? 0 }}</span>
                            <span>{{ t('pageAgent.f3') }}</span>
                        </div>
                        <div class='item'>
                            <span>{{ unit }}{{ userTeam.agent_sub_data_today.team_bet_money ?? '0' }}</span>
                            <span>{{ t('pageAgent.f4') }}</span>
                        </div>
                        <div class='item'>
                            <span>{{ unit }}{{ userTeam.agent_sub_data_today.team_commission_money ??
                                '0' }}</span>
                            <span>{{ t('pageAgent.f5') }}</span>
                        </div>
                    </div>
                </div>

                <div class="total-card-wrap">
                    <div class="title cursor">{{ t('pageAgent.f6') }}
                        <public-svg class="icon" icon="icon_Help" @click="setShowTotalNewUserHelp"></public-svg>
                    </div>
                    <div class="line"></div>
                    <div class="item-wrap">
                        <div class='item'>
                            <span>{{ userTeam.agent_sub_data.team_reg_num ?? 0 }}</span>
                            <span>{{ t('pageAgent.f2') }}</span>
                        </div>
                        <div class='item'>
                            <span>{{ userTeam.agent_sub_data.new_reg_num ?? 0 }}</span>
                            <span>{{ t('pageAgent.f8') }}</span>
                        </div>
                        <div class='item'>
                            <span>{{ unit }}{{ userTeam.agent_sub_data.team_bet_money ?? '0' }}</span>
                            <span>{{ t('pageAgent.f9') }}</span>
                        </div>
                        <div class='item'>
                            <span>{{ unit }}{{ userTeam.agent_sub_data.team_commission ?? '0'
                            }}</span>
                            <span>{{ t('pageAgent.f5') }}</span>
                        </div>
                    </div>
                </div>

                <div class="withdrawal-card-wrap">
                    <div class="title">{{ t('pageAgent.f10') }}
                        <public-svg class="icon cursor" icon="icon_Help" @click="switchTab(3)"></public-svg>
                    </div>
                    <div class="line"></div>
                    <div class="content-wrap">
                        <div class="vip-img">
                            <span>&nbsp;</span>
                            <public-svg class="vip-icon" icon="icon_VipClub" @click="switchTab(3)"></public-svg>
                            <div class="level">{{ t('pageAgent.f11') }}
                                <public-svg class="level-icon cursor" icon="icon_Help" @click="switchTab(3)"></public-svg>
                            </div>
                        </div>

                        <div class="right-item ">
                            <div class="income-box ">
                                <div class="income cursor" @click="$open('/agent-receive')">
                                    <span>{{ unit }}{{
                                        userTeam.commission.has_receive_commission ??
                                        0
                                    }}</span>
                                    <span class="">{{ t('pageAgent.f12') }}</span>
                                </div>
                                <div class="income cursor" @click="$open('/agent-rebate')">
                                    <span>{{ unit }}{{
                                        userTeam.commission.receive_commission
                                        ?? 0
                                    }}</span>
                                    <span>{{ t('pageAgent.f13') }}</span>
                                </div>
                            </div>
                            <div class="withdrawal-box column-center cursor" @click="$open('/agent-rebate')">
                                <div class="btn all-center">{{ t('pageAgent.f14') }}</div>
                                <div class="tip ">{{ t('pageAgent.f15') }}</div>
                            </div>
                        </div>
                    </div>
                </div>



                <div v-if="false">

                    <div class="card bb-card">
                        <view class="ad-card">
                            <div class="ad-card-text">
                                <p class="p1">{{ $t('pageAgent.z1') }}</p>
                                <p class="p2">{{ $t('pageAgent.z2') }}</p>
                            </div>
                            <div class="ad-card-img">
                                <img src="@/assets/new/agent/removebg-preview.png" alt="">
                            </div>
                            <div class="ddk h5">
                                Referral Rewards
                            </div>
                        </view>

                        <view class="qr-card">
                            <view class="url-box">
                                <view class="url-copy-team">
                                    <view class="url-copy-team-name">
                                        <img class="pc" src="@/assets/new/agent/pay-code-two.png" alt="">
                                        <span>{{ $t('pageAgent.c1') }}</span>
                                    </view>
                                    <view class="url-copy-team-view xx-btn ds">
                                        <text class="ellipsis">{{ userTeam.domain[0].url + '?invite_code=' +
                                            userTeam.inviteCode
                                        }}</text>
                                        <div class="copy-svg"
                                            @click="$copy(userTeam.domain[0].url + '?invite_code=' + userTeam.inviteCode)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33"
                                                viewBox="0 0 33 33" fill="none">
                                                <g opacity="0.9" clip-path="url(#clip0_1792_4186)">
                                                    <path
                                                        d="M10.1249 25.0559H22.1931V29.5559C22.1931 30.9059 21.0885 32.0105 19.7385 32.0105H3.17037C1.82037 32.0105 0.71582 30.9059 0.71582 29.5559V12.9877C0.71582 11.6377 1.82037 10.5332 3.17037 10.5332H7.67037V22.6014C7.67037 23.9514 8.77491 25.0559 10.1249 25.0559Z"
                                                        fill="var(--SVG,#00FFFF)" />
                                                    <path
                                                        d="M32.2156 3.37447V19.9426C32.2156 21.2926 31.111 22.3972 29.761 22.3972H13.1928C11.8428 22.3972 10.7383 21.2926 10.7383 19.9426V3.37447C10.7383 2.02447 11.8428 0.919922 13.1928 0.919922H29.761C31.111 0.919922 32.2156 2.02447 32.2156 3.37447Z"
                                                        fill="var(--SVG,#00FFFF)" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1792_4186">
                                                        <rect width="32.7273" height="32.7273" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    </view>
                                </view>
                                <view class="url-copy-team">
                                    <view class="url-copy-team-name">
                                        <img class="pc" src="@/assets/new/agent/link-one.png" alt="">
                                        <span>{{ $t('pageAgent.c2') }}</span>
                                    </view>
                                    <view class="url-copy-team-view xx-btn ds">
                                        <text class="ellipsis">{{ userTeam.inviteCode }}</text>
                                        <div class="copy-svg" @click="$copy(userTeam.inviteCode)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33"
                                                viewBox="0 0 33 33" fill="none">
                                                <g opacity="0.9" clip-path="url(#clip0_1792_4186)">
                                                    <path
                                                        d="M10.1249 25.0559H22.1931V29.5559C22.1931 30.9059 21.0885 32.0105 19.7385 32.0105H3.17037C1.82037 32.0105 0.71582 30.9059 0.71582 29.5559V12.9877C0.71582 11.6377 1.82037 10.5332 3.17037 10.5332H7.67037V22.6014C7.67037 23.9514 8.77491 25.0559 10.1249 25.0559Z"
                                                        fill="var(--SVG,#00FFFF)" />
                                                    <path
                                                        d="M32.2156 3.37447V19.9426C32.2156 21.2926 31.111 22.3972 29.761 22.3972H13.1928C11.8428 22.3972 10.7383 21.2926 10.7383 19.9426V3.37447C10.7383 2.02447 11.8428 0.919922 13.1928 0.919922H29.761C31.111 0.919922 32.2156 2.02447 32.2156 3.37447Z"
                                                        fill="var(--SVG,#00FFFF)" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1792_4186">
                                                        <rect width="32.7273" height="32.7273" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                    </view>
                                </view>
                                <view class="url-copy-team">
                                    <view class="url-copy-team-name">{{ $t('pageAgent.c3') }}</view>
                                    <view class="url-copy-team-view xx-btn">
                                        <div class="share-team">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                                                viewBox="0 0 60 60" fill="none">
                                                <g clip-path="url(#clip0_1782_3635)">
                                                    <path
                                                        d="M30 0C13.4312 0 0 13.4312 0 30C0 46.5687 13.4312 60 30 60C46.5687 60 60 46.5687 60 30C60 13.4312 46.5687 0 30 0Z"
                                                        fill="url(#paint0_linear_1782_3635)" />
                                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                                        d="M26.1322 48V32.0988H21V25.473H26.1322V20.172C26.1322 14.6946 29.4885 12 34.2181 12C36.4836 12 38.4319 12.1746 39 12.252V17.976H35.7186C33.1464 17.976 32.5469 19.2414 32.5469 21.0936V25.473H38.9599L37.6773 32.097H32.5469L32.6497 48"
                                                        fill="#16122F" />
                                                </g>
                                                <defs>
                                                    <linearGradient id="paint0_linear_1782_3635" x1="0.0930919" y1="59.8594"
                                                        x2="59.9056" y2="59.8594" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="var(--SVG,#00FFFF)" />
                                                        <stop offset="1" stop-color="#FF92FF" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_1782_3635">
                                                        <rect width="60" height="60" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span>Facebook</span>
                                        </div>
                                        <div class="share-team">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                                                viewBox="0 0 60 60" fill="none">
                                                <g clip-path="url(#clip0_1782_3640)">
                                                    <path
                                                        d="M30 0C24.0666 0 18.2664 1.75947 13.3329 5.05591C8.39943 8.35235 4.55426 13.0377 2.28363 18.5195C0.0129986 24.0013 -0.581101 30.0333 0.576455 35.8527C1.73401 41.6721 4.59123 47.0176 8.78681 51.2132C12.9824 55.4088 18.3279 58.266 24.1473 59.4235C29.9667 60.5811 35.9987 59.987 41.4805 57.7164C46.9623 55.4457 51.6476 51.6006 54.9441 46.6671C58.2405 41.7336 60 35.9334 60 30C60 26.0603 59.224 22.1593 57.7164 18.5195C56.2087 14.8797 53.999 11.5726 51.2132 8.78679C48.4274 6.00104 45.1203 3.79125 41.4805 2.28361C37.8407 0.775973 33.9397 0 30 0Z"
                                                        fill="#16122F" />
                                                    <path
                                                        d="M30 0C24.0666 0 18.2664 1.75947 13.3329 5.05591C8.39943 8.35235 4.55426 13.0377 2.28363 18.5195C0.0129985 24.0013 -0.581101 30.0333 0.576455 35.8527C1.73401 41.6721 4.59123 47.0176 8.78681 51.2132C12.9824 55.4088 18.3279 58.266 24.1473 59.4235C29.9667 60.5811 35.9987 59.987 41.4805 57.7164C46.9623 55.4457 51.6476 51.6006 54.9441 46.6671C58.2405 41.7336 60 35.9334 60 30C60 26.0603 59.224 22.1593 57.7164 18.5195C56.2087 14.8797 53.999 11.5726 51.2132 8.78679C48.4274 6.00104 45.1203 3.79125 41.4805 2.28361C37.8407 0.775973 33.9397 0 30 0ZM39.54 45.456C39.428 45.7363 39.2574 45.9893 39.0395 46.1982C38.8217 46.407 38.5616 46.5668 38.2769 46.6669C37.9922 46.7669 37.6893 46.8048 37.3887 46.7781C37.0881 46.7514 36.7966 46.6607 36.534 46.512L28.389 40.182L23.163 45.006C23.0417 45.0956 22.8998 45.1532 22.7504 45.1736C22.601 45.1941 22.4489 45.1767 22.308 45.123L23.31 36.156L23.34 36.183L23.361 36.006C23.361 36.006 38.016 22.662 38.613 22.095C39.219 21.528 39.018 21.405 39.018 21.405C39.054 20.715 37.935 21.405 37.935 21.405L18.516 33.897L10.431 31.143C10.431 31.143 9.18901 30.699 9.07201 29.718C8.94901 28.746 10.47 28.218 10.47 28.218L42.621 15.444C42.621 15.444 45.264 14.268 45.264 16.218L39.54 45.456Z"
                                                        fill="url(#paint0_linear_1782_3640)" />
                                                </g>
                                                <defs>
                                                    <linearGradient id="paint0_linear_1782_3640" x1="0.0930919" y1="59.8594"
                                                        x2="59.9056" y2="59.8594" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="var(--SVG,#00FFFF)" />
                                                        <stop offset="1" stop-color="#FF92FF" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_1782_3640">
                                                        <rect width="60" height="60" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span>Telegram</span>
                                        </div>
                                        <div class="share-team">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                                                viewBox="0 0 60 60" fill="none">
                                                <g clip-path="url(#clip0_1782_3645)">
                                                    <path
                                                        d="M30 0C46.5857 0 60 13.4143 60 30C60 46.5857 46.5857 60 30 60C13.4143 60 0 46.5857 0 30C0 13.4143 13.4143 0 30 0Z"
                                                        fill="#16122F" />
                                                    <path
                                                        d="M30 0C46.5857 0 60 13.4143 60 30C60 46.5857 46.5857 60 30 60C13.4143 60 0 46.5857 0 30C0 13.4143 13.4143 0 30 0ZM24.5143 45.8143C37.8 45.8143 45.0857 34.8 45.0857 25.2429V24.3C46.5 23.2714 47.7429 21.9857 48.6857 20.5286C47.4 21.0857 45.9857 21.4714 44.5286 21.6857C46.0286 20.7857 47.1857 19.3714 47.7 17.7C46.2857 18.5143 44.7429 19.1143 43.1143 19.4571C41.7857 18.0429 39.9 17.1857 37.8429 17.1857C33.8571 17.1857 30.6 20.4429 30.6 24.4286C30.6 24.9857 30.6429 25.5429 30.8143 26.0571C24.8143 25.7571 19.4571 22.8857 15.9 18.5143C15.3 19.5857 14.9143 20.8286 14.9143 22.1571C14.9143 24.6429 16.2 26.8714 18.1286 28.1571C16.9286 28.1571 15.8143 27.8143 14.8714 27.2571V27.3429C14.8714 30.8571 17.3571 33.7714 20.6571 34.4571C20.0571 34.6286 19.4143 34.7143 18.7714 34.7143C18.3 34.7143 17.8714 34.6714 17.4 34.5857C18.3 37.4571 21 39.5571 24.1286 39.6C21.6429 41.5286 18.5143 42.6857 15.1286 42.6857C14.5286 42.6857 13.9714 42.6857 13.4143 42.6C16.5857 44.6571 20.4 45.8571 24.4714 45.8571"
                                                        fill="url(#paint0_linear_1782_3645)" />
                                                </g>
                                                <defs>
                                                    <linearGradient id="paint0_linear_1782_3645" x1="0.0930919" y1="59.8594"
                                                        x2="59.9056" y2="59.8594" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="var(--SVG,#00FFFF)" />
                                                        <stop offset="1" stop-color="#FF92FF" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_1782_3645">
                                                        <rect width="60" height="60" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span>Twitter</span>
                                        </div>
                                        <div class="share-team">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                                                viewBox="0 0 60 60" fill="none">
                                                <g clip-path="url(#clip0_1782_3650)">
                                                    <path
                                                        d="M30 0C13.4312 0 0 13.4312 0 30C0 46.5687 13.4312 60 30 60C46.5687 60 60 46.5687 60 30C60 13.4312 46.5687 0 30 0Z"
                                                        fill="url(#paint0_linear_1782_3650)" />
                                                    <path
                                                        d="M42 18H18C16.35 18 15.015 19.35 15.015 21L15 39C15 40.65 16.35 42 18 42H42C43.65 42 45 40.65 45 39V21C45 19.35 43.65 18 42 18ZM42 24L30 31.5L18 24V21L30 28.5L42 21V24Z"
                                                        fill="#16122F" />
                                                </g>
                                                <defs>
                                                    <linearGradient id="paint0_linear_1782_3650" x1="0.0930919" y1="59.8594"
                                                        x2="59.9056" y2="59.8594" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="var(--SVG,#00FFFF)" />
                                                        <stop offset="1" stop-color="#FF92FF" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_1782_3650">
                                                        <rect width="60" height="60" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span>Email</span>
                                        </div>
                                        <div class="share-team">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                                                viewBox="0 0 60 60" fill="none">
                                                <g clip-path="url(#clip0_1782_3655)">
                                                    <path
                                                        d="M30 0C13.4312 0 0 13.4312 0 30C0 46.5687 13.4312 60 30 60C46.5687 60 60 46.5687 60 30C60 13.4312 46.5687 0 30 0Z"
                                                        fill="url(#paint0_linear_1782_3655)" />
                                                    <path
                                                        d="M38.0077 18.17C36.7434 16.7393 36.0467 14.902 36.0472 13H30.3323V35.7333C30.2882 36.9635 29.7642 38.1288 28.8707 38.9837C27.9772 39.8386 26.7839 40.3165 25.5421 40.3167C22.9158 40.3167 20.7334 38.19 20.7334 35.55C20.7334 32.3967 23.8036 30.0317 26.9662 31.0033V25.21C20.5855 24.3667 15 29.28 15 35.55C15 41.655 20.1046 46 25.5236 46C31.331 46 36.0472 41.325 36.0472 35.55V24.0183C38.3646 25.6681 41.1469 26.5532 44 26.5483V20.8833C44 20.8833 40.523 21.0483 38.0077 18.17Z"
                                                        fill="#16122F" />
                                                </g>
                                                <defs>
                                                    <linearGradient id="paint0_linear_1782_3655" x1="0.0930919" y1="59.8594"
                                                        x2="59.9056" y2="59.8594" gradientUnits="userSpaceOnUse">
                                                        <stop stop-color="var(--SVG,#00FFFF)" />
                                                        <stop offset="1" stop-color="#FF92FF" />
                                                    </linearGradient>
                                                    <clipPath id="clip0_1782_3655">
                                                        <rect width="60" height="60" fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span>TikTok</span>
                                        </div>
                                    </view>
                                </view>
                            </view>

                        </view>
                    </div>

                    <div class="divider h5"></div>

                    <div class="card">


                        <div class="tips-card-k">
                            <div class="tips-card">
                                <div class="tips-card-img">
                                    <img src="@/assets/new/agent/image693.png" alt="">
                                </div>
                                <div class="tips-card-v">
                                    <div class="p1">
                                        <div class="p1-1">{{ $t('pageAgent.a1') }}</div>
                                        <div class="p1-2">{{ $t('pageAgent.a2') }}</div>
                                    </div>
                                    <div class="p2">{{ $t('pageAgent.a3') }}</div>
                                    <div class="p3">{{ $t('pageAgent.a4') }}</div>

                                    <div class="p4 h5">
                                        <border-gradient class="btn" :border-color="['#FF92FF', '#00FFFF']" :border="1">
                                            <div class="kf-btn" @click="$open('/waiter')">{{ $t('pageAgent.a5') }}</div>
                                        </border-gradient>
                                    </div>

                                </div>
                                <div class="p4-btn pc">
                                    <border-gradient class="btn" :border-color="['#FF92FF', '#00FFFF']" :border="1">
                                        <div class="kf-btn" @click="$open('/waiter')">{{ $t('pageAgent.a5') }}</div>
                                    </border-gradient>
                                </div>
                            </div>
                        </div>

                    </div>
                    <public-page-footer class="pc"></public-page-footer>
                </div>


                <CommunitySharing :userInfo="userTeam"></CommunitySharing>

                <div class="commission-box">
                    <div class="title">{{ t('pageAgent.f16') }}
                        <public-svg class="icon cursor" icon="icon_Help" @click="switchTab(4)"></public-svg>
                    </div>
                    <div class="line"></div>
                    <div class="hint-box">
                        <div class="high-tip">{{ t('pageAgent.f17') }}{{ hostname }}{{ t('pageAgent.f18') }}</div>
                        <div class="rule-box row-center">
                            <img class="money-img" src="@/assets/9f/agent/money.png" alt="">
                            <div class="can-get">
                                <span style="color:red">{{ t('pageAgent.f19') }}</span>
                                <span style="color:red">{{ t('pageAgent.f20') }}</span>
                            </div>
                        </div>
                        <span class="down-line all-center">{{ t('pageAgent.f21') }}</span>
                        <img class="down-line-img" src="@/assets/9f/agent/group_mx.png" alt="">
                        <div class="tip">
                            <span>{{ t('pageAgent.f22') }}</span>
                            <span style="color:red">{{ t('pageAgent.f23') }}</span>
                        </div>
                        <div class="tip">
                            <span>{{ t('pageAgent.f24') }}</span>
                        </div>
                    </div>
                </div>

            </div>

        </view>
    </view>
    <teleport to="#independent">
        <Transition name="faceIn">
            <div class="popup-div" v-if="showNewUserHelp">
                <div class="mark" @click="setShowNewUserHelp"></div>
                <div class="content-box">
                    <public-svg class="close" icon="icon_Close" @click="setShowNewUserHelp"></public-svg>
                    <div class="title">{{ t('pageAgent.f29') }}</div>
                    <div class="content">
                        <ul>
                            <li>{{ t('pageAgent.f30') }}</li>
                            <li>{{ t('pageAgent.f31') }}</li>
                            <li>{{ t('pageAgent.f32') }}</li>
                        </ul>
                        <div class="notice">{{ t('pageAgent.f33') }}</div>
                    </div>
                </div>
            </div>
        </Transition>
    </teleport>
    <teleport to="#independent">
        <Transition name="faceIn">
            <div class="popup-div" v-if="showTotalNewUserHelp">
                <div class="mark" @click="setShowTotalNewUserHelp"></div>
                <div class="content-box">
                    <public-svg class="close" icon="icon_Close" @click="setShowTotalNewUserHelp"></public-svg>
                    <div class="title">{{ t('pageAgent.f29') }}</div>
                    <div class="content">
                        <ul>
                            <li>{{ t('pageAgent.f34') }}</li>
                            <li>{{ t('pageAgent.f35') }}</li>
                            <li>{{ t('pageAgent.f36') }}</li>
                        </ul>
                        <div class="notice">{{ t('pageAgent.f37') }}</div>
                    </div>
                </div>
            </div>
        </Transition>
    </teleport>
</template>
<script setup lang="ts">
import PublicSvg from "../../components/public-svg.vue";
import PublicPageFooter from "../../components/public-page-footer.vue"
import PublicLoading from "../../components/public-loading.vue"
import BorderGradient from "../../components/border-gradient.vue"
import CommunitySharing from "../../components/community-sharing.vue"
import { ref, onMounted, nextTick, inject, watch } from "vue"
import { addListener, dbGet, dbSet } from "../../uilts/db"
import { unit } from "../../uilts/async.var"
import QRcode from 'qrcode';
import { agentInit } from "../../uilts/emit"
import { onShow, onLoad } from '../../router/routes';
import { t } from '@/uilts/i18n';


const props = withDefaults(defineProps<{
    isPulldown?: boolean,
    isPullup?: boolean,
}>(), {
    isPulldown: false,
    isPullup: false,
})
const emits = defineEmits(['update:isPulldown',])

const isApiOk = ref(false)
const hostname = ref(window.location.hostname);

const useToggle = () => {
    const show = ref(false)
    const toggle = () => {
        show.value = !show.value;
    }
    return [show, toggle]
}

const [showNewUserHelp, setShowNewUserHelp] = useToggle();
const [showTotalNewUserHelp, setShowTotalNewUserHelp] = useToggle();
const switchTab = inject('switchTab');

const user = ref<UserModel>({});
dbGet('user').then((ret: UserModel) => {
    user.value = ret
})



watch(() => props.isPulldown, (newVal) => {
    if (newVal) {
        updateData();
        setTimeout(() => {
            emits('update:isPulldown', false)
        }, 500)
    }
})

const userTeam = ref<UserTeam['response']>({
    /**
         * 推荐码
        */
    inviteCode: '',
    /**
     * 分享下载链接地址
    */
    domain: [],
    /**
     * 分享页背景图
     */
    image: [],
    /**
     * 可领取和已领取佣金数据 
    */
    commission: {
        /**
         * 可领取佣金
        */
        receive_commission: 0,
        /**
         * 已领取佣金
        */
        has_receive_commission: 0,
    },
    /**
     * 代理团队数据（总计）
    */
    agent_sub_data: {
        /**
         * 用户ID
        */
        user_id: 0,
        /**
         * 团队注册人数  
        */
        team_reg_num: 0,
        /**
         * 新玩家数
        */
        new_reg_num: 0,
        /**
         * 总佣金
        */
        team_commission: 0,
        /**
         * 游戏投注量
        */
        team_bet_money: 0,
    },
    agent_sub_data_today: {
        /**
        * 用户ID
        */
        user_id: 0,
        /**
         * 团队注册人数  
        */
        team_reg_num: 0,
        /**
         * 新玩家数
        */
        new_reg_num: 0,
        /**
         * 总佣金
        */
        team_commission_money: 0,
        /**
         * 游戏投注量
        */
        team_bet_money: 0,
    },

    /**
     * 卡片展示位置的代理数据
    */
    agent_show_data: {
        /**
         * 本月团队返佣  
         */
        team_commission_month: 0,
        /**
         * 本月我的返佣  
         */
        my_commission_month: 0,
        /**
         * 新玩家数
        */
        max_agent_bonus: {
            /**
             * 奖励类型 为rate时为百分百
             */
            bonus_type: '',
            /**
             * 最高比例或最高奖励  
            */
            bonus: 0,
        },
        /**
         * 每月最高返佣  
        */
        max_commission_month: 0,
    }
})

const tab = ref(1)
const qrUrl = ref('')
//获取我的推广
const getUserTeam = () => {
    '/api/agent/team'.GET<UserTeam>(null, {
        Authorization: async () => await dbGet('token')
    }).then(ret => {
        userTeam.value = ret
        qrDown()
    }).finally(() => {
        isApiOk.value = false;
    })
}


// #ifdef APP-PLUS
// const downloadImage = (base64Data) => {

// 	uni.saveImageToPhotosAlbum({
// 		filePath: base64Data,
// 		success: function () {
// 			hint(t('share.saveok'))
// 		}
// 	});
// }
// #endif

const qrDown = () => {
    let url = userTeam.value?.domain[0]?.url ?? '';
    let code = userTeam.value?.inviteCode ?? '';

    qrUrl.value = url + '?invite_code=' + code
    nextTick(() => {
        // generateQRCode(qrUrl.value)
    })

}


//获取用户信息
const getInfo = () => {

    '/api/user/getInfo'.GET<GetInfo>(null, {
        Authorization: async () => await dbGet('token')
    }).then(async ret => {
        await dbSet("user", ret);
    })
}

const canvasQRcode = ref()
let qrImg = ref('')
const generateQRCode = (text: string) => {
    QRcode.toCanvas(canvasQRcode.value, text, { width: 115 }, (_res: any) => {
        qrImg.value = canvasQRcode.value.toDataURL()
    });
}

const updateData = () => {
    getInfo();
    getUserTeam();

    tab.value = 1
}

onMounted(() => {
    getInfo();
    getUserTeam();
    addListener('language', (type, _name) => {
        if (type === 'set') {
            getUserTeam();
        }
    })
    agentInit(getUserTeam)
})


onShow(() => {
    updateData();
    tab.value = 1
})
</script>

<style lang="scss" scoped>
@import '../../scss/public.scss';

li {
    font-family: SWISSC;
}

.faceIn-enter-active {
    animation: face-in 0.3s;
}

.faceIn-leave-active {
    animation: face-in 0.3s reverse;
}

@keyframes face-in {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@mixin cardWrap {
    display: flex;
    background: white;
    flex-direction: column;
    padding: 0 .625rem;
    margin-bottom: .625rem;
    border-radius: .125rem;

    .title {
        display: flex;
        flex-direction: row;
        font-family: SWISSC-BT;
        color: grey;
        font-size: .75rem;
        padding: .3125rem 0;
        align-items: center;

        .icon {
            margin-left: .3125rem;
            width: .9375rem;
            height: .9375rem;
            fill: gray;
            margin-top: .0625rem;
        }
    }

    .line {
        background: #bdbdbd;
        width: 100%;
        height: 1px;
    }
}

.page-pading {
    position: relative;
    height: 100%;
    background: rgb(237, 237, 237);
    overflow-y: auto;
}

.tab-box {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    width: 100%;

    .tab {
        font-size: .9375rem;
        color: rgba(grey, .8);
        margin-bottom: .3125rem;
    }

    .line {
        position: absolute;
        left: 0;
        bottom: 0;
        height: .125rem;
        transition: all .3s ease;
        background: #009d80;
    }
}

.public-loading-top {
    margin-top: 100%;
}

.content {}

.tips-card-k {
    padding: 0.5000rem 0 0.6250rem;

    @include pc {
        padding: 0;
    }

    .tips-card {
        background: #231D4E;
        border-radius: 0.5000rem;
        display: flex;
        padding: 0.6250rem;

        @include pc {
            padding: 20px;
            height: 265px;
            background: #231D4E;
            display: flex;
            align-items: center;
            width: calc(100% - 40px);
            border-radius: 16px;
        }

        .tips-card-img {
            width: 8.0313rem;
            height: 7.7500rem;

            @include pc {
                width: 285px;
                height: 265px;
            }

            img {
                width: 100%;
                height: 100%;
            }
        }

        .tips-card-v {
            padding-left: 0.6250rem;
            width: calc(100% - 1.2500rem - 7.7188rem - 0.3125rem);

            @include pc {
                width: auto;
            }

            .p1 {
                @include pc {
                    display: flex;
                    min-height: 40px;
                    line-height: 40px;
                    // align-items: center;
                }

                .p1-1 {
                    color: var(--MENU, #8E90CD);
                    font-family: PingFang SC;
                    font-size: 0.7500rem;
                    font-style: normal;
                    font-weight: 600;
                    line-height: normal;

                    @include pc {
                        font-size: 24px;
                        line-height: 44px;
                    }
                }

                .p1-2 {
                    opacity: 0.8;
                    color: var(--SVG);
                    font-family: PingFang SC;
                    font-size: 0.8750rem;
                    font-style: normal;
                    font-weight: 600;
                    line-height: normal;
                    padding-top: 0.3125rem;

                    @include pc {
                        padding-top: 0;
                        font-size: 28px;
                        padding-left: 20px;
                    }
                }
            }

            .p2 {
                color: var(--MENU, #8E90CD);
                font-family: PingFang SC;
                font-size: 0.5625rem;
                font-style: normal;
                font-weight: 400;
                line-height: normal;

                @include pc {
                    font-size: 16px;
                    padding: 10px 0;
                }
            }

            .p3 {
                color: var(--TAB-, #5B6DA1);
                font-family: PingFang SC;
                font-size: 0.5625rem;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                padding: 0.6250rem 0;

                @include pc {
                    font-size: 16px;
                    padding: 0;
                }
            }

            .p4 {
                display: flex;
                justify-content: flex-end;
            }

            .btn {
                border-radius: 0.5rem;
            }

            .kf-btn {
                color: #FFFFFF;
                text-align: center;
                font-family: PingFang SC;
                font-size: 0.8750rem;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0.2500rem 1.2500rem;
            }
        }

        @include pc {

            .kf-btn {
                color: #FFFFFF;
                text-align: center;
                font-family: PingFang SC;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                display: flex;
                justify-content: center;
                align-items: center;
                display: flex;
                width: 111px;
                height: 50px;
                padding: 8px 40px;
                justify-content: center;
                align-items: center;
                flex-shrink: 0;


            }

            .p4-btn {
                margin-left: 122px;

                .btn {
                    border-radius: 8px;
                }
            }
        }
    }
}

.ddv {
    @include pc {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 64px;

        .menu-team-k {
            padding-bottom: 20px;
            width: calc(50% - 13px);
        }
    }
}

.menu-team-k {
    @include h5 {
        padding-bottom: 0.6250rem;
    }
}

.menu-team {
    padding: 0.6250rem;
    border-radius: 0.5000rem;
    background: #201E47;
    display: flex;
    align-items: center;

    @include pc {
        padding: 20px;
        border-radius: 16px;
    }

    .menu-icon {
        width: 2.7500rem;
        height: 2.7500rem;

        @include pc {
            width: 80px;
            height: 80px
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .menu-right {
        padding-left: 0.6250rem;
        width: calc(100% - 2.7500rem);

        @include pc {
            padding-left: 20px;
            padding-right: 20px;
            width: calc(100% - 160px - 116px);
        }

        .menu-right-top {
            // display: flex;
            // align-items: center;

            .menu-right-top-p1 {
                font-size: 0.7500rem;
                color: var(--MENU, #8E90CD);
                vertical-align: middle;
                white-space: nowrap;
                display: block;

                @include pc {
                    font-size: 20px;
                }
            }

            .menu-right-top-p2 {
                font-size: 0.5625rem;
                color: #5B6DA1;
                font-weight: 300;
                // margin-left: 0.5000rem;
                padding: 0.1rem 0;
                vertical-align: middle;

                @include pc {
                    font-size: 14px;
                }
            }
        }

        .menu-right-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 0.6250rem;

            .menu-right-bottom-left {
                font-size: 0.6875rem;

                @include pc {
                    font-size: 18px;
                }

                .p1 {
                    color: var(--TAB-, #5B6DA1);

                    @include pc {
                        padding-right: 8px;
                    }
                }

                .p2 {
                    color: #14D03D;
                }
            }

            .menu-btn {
                padding: 0.2500rem 1.2500rem;
                border-radius: 0.5000rem;
                // border: 1px solid #29ACC9;
                color: #FFF;
                text-align: center;
                font-family: PingFang SC;
                font-size: 0.8750rem;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                background: var(--H5-, #201E47);

                @include pc {
                    padding: 11px;
                    min-width: 114px;
                    font-size: 16px;
                    font-style: normal;
                    font-weight: 600;
                }
            }

            .btn {
                border-radius: 0.5000rem;

                @include pc {
                    border-radius: 8px;
                }
            }
        }
    }

    @include pc {
        .btn {
            border-radius: 8px;
        }
    }

    .menu-btn {


        @include pc {
            border-radius: 8px;
            // border: 1px solid #29ACC9;
            color: #FFF;
            text-align: center;
            font-family: PingFang SC;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
            background: var(--H5-, #201E47);
            padding: 11px;
            min-width: 114px;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            margin-left: auto;
        }
    }
}

.card {
    @include h5 {
        padding: 0.625rem 0.625rem 0;
    }
}

.total-card-wrap,
.today-card-wrap {
    @include cardWrap();

    .item-wrap {
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: .3125rem .625rem;
        box-sizing: border-box;

        .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: .125rem 0;
            font-family: SWISSC;

            span:nth-child(1) {
                font-size: .9375rem;
                color: #383838;
                white-space: nowrap;
                font-family: SWISSC-BT;
            }

            span:nth-child(2) {
                font-size: .625rem;
                text-align: center;
                color: grey;
                white-space: nowrap;
            }
        }
    }
}

.commission-box {
    @include cardWrap();
    margin-top: .625rem;

    .hint-box {
        padding: .625rem 0rem;

        .high-tip {
            font-family: SWISSC-BT;
            color: #442729;
            font-size: .875rem;
            text-align: center;
        }

        span {
            color: #442729;
            font-size: .9375rem;
        }


        .rule-box {
            margin-top: .625rem;
            font-family: SWISSC;

            .can-get {
                display: flex;
                flex-direction: column;
            }

            img {
                width: 4.375rem;
                height: 4.375rem;
            }
        }

        .down-line {
            font-family: SWISSC-BT;
            font-size: .875rem;
            text-align: center;
        }

        .down-line-img {
            width: 100%;
        }

        .tip {
            font-family: SWISSC;
            margin-top: .625rem;

            span {
                font-size: .75rem;
            }
        }
    }

}

.withdrawal-card-wrap {
    @include cardWrap();

    .content-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .625rem 0;
        font-family: SWISSC;


        .vip-img {
            width: 5rem;
            height: 5rem;
            background: #f5f5f5;
            border-radius: .625rem;
            margin-right: 1.25rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            flex-direction: column;

            .level {
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                flex-direction: row;
                font-size: .625rem;
                color: #009d80;
                margin-top: -0.25rem;

                .level-icon {
                    width: .625rem;
                    height: .625rem;
                    margin-left: .125rem;
                    fill: gray;
                }
            }

            span {
                background: #009d80;
                padding: .125rem .3125rem;
                position: absolute;
                font-size: .9375rem;
                color: white;
            }

            .vip-icon {
                fill: #009d80;
                width: 70%;
                height: 70%;
            }
        }

        .right-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;

            .income-box {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: space-around;

                .income {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: .625rem;
                    flex: 1;
                    color: #000;
                    font-size: .875rem;
                    font-family: SWISSC-BT;

                    span:last-child {
                        color: grey;
                        font-size: .625rem;
                        font-family: SWISSC;
                    }
                }
            }

            .withdrawal-box {
                .btn {
                    border-radius: .3125rem;
                    padding: .3125rem .625rem;
                    font-size: .75rem;
                    border: 1px solid #009d81;
                    color: #009d81;
                }

                .tip {
                    font-size: .625rem;
                    margin-top: .3125rem;
                }
            }
        }
    }

    .high-tip {
        font-size: .9375rem;
        color: #442729;
        padding: .625rem;
        padding-bottom: 0;
    }


}


.canvasQRcode {
    display: none;
}

page {
    // 
    background-color: #24262B;
    min-height: 100%;
}

.ratio-title {
    color: #FFFFFF;
    padding-left: 0.6250rem;
    padding-top: 0.6250rem;
}

.agentTab3 {
    padding: 0 0.6250rem;
}

.statistics-card {
    // background-color: #1C1E22;
    border-radius: 0.1087rem;
    display: flex;
    flex-wrap: wrap;
    // padding: 0.4688rem 0;
    justify-content: space-around;
    margin-bottom: 0.625rem;

    @include pc {
        padding: 0 0 32px;
    }

    .statistics-card-title {
        padding: 0 0 0.625rem;
        color: var(--MENU);
        font-family: PingFang SC;
        font-size: 0.7500rem;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
        text-align: left;
        width: 100%;

        @include pc {
            color: #8E90CD;
            font-family: PingFang SC;
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            padding-bottom: 32px;
        }
    }

    .statistics-card-div {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.31rem;
        grid-row-gap: 0.31rem;
        font-size: 0.75rem;
        color: #5B6DA1;

        span {
            font-size: 1rem;
            font-weight: 500;
            color: #0FF;
        }

        @include pc {
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-gap: 20px;
            width: 100%;
            padding-bottom: 32px;
            justify-content: space-between;

            span {
                font-size: 24px;
            }
        }
    }

    .statistics-card-team {
        padding: 0.6250rem;
        border-radius: 0.3750rem;
        background: #201E47;

        @include pc {
            // width: calc(361px - 40px);
            padding: 20px;
        }

        text {
            display: block;
        }

        .statistics-num {

            @include pc {
                padding-bottom: 8px;
                font-size: 24px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                text-align: center;
            }
        }

        .statistics-name {
            span {
                padding-left: 1rem;
            }

            @include pc {
                text-align: center;
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;

                span {
                    padding-left: 0;
                    display: block;
                    font-size: 24px;
                    padding-bottom: 8px;
                }
            }
        }
    }
}

.border-bottom {
    display: flex;
    justify-content: space-around;
    border-bottom: 0.0313rem solid #2C2F34;
    width: 100%;

    +.border-bottom {
        border: none;
    }
}

.statistics-user {
    border-radius: 0.1087rem;
    padding-bottom: 0.6250rem;

    @include pc {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 64px;
    }

    .statistics-card-user {
        margin: auto;
        text-align: center;
        padding: 0.9375rem 0;
        border-bottom: 0.0313rem solid #2C2F34;
    }

    .head-img {
        width: 4.3438rem;
    }

    .statistics-card-integral {
        // margin-top: 0.6250rem;
        padding: 0.6250rem;
        border-radius: 0.5000rem;
        display: flex;
        justify-content: space-between;
        background: #201E47;

        @include pc {
            width: calc(50% - 55px);
            border-radius: 24px;
            padding: 20px;
            height: calc(201px - 40px);
        }

        .left-statistics-card-integral {
            display: flex;
            align-items: center;
        }

        text {
            display: block;
        }

        .icon-div {
            display: flex;
            align-items: center;

            @include h5 {
                width: 2.6563rem;
                height: 1.6563rem;
                text-align: center;
            }

            @include pc {
                padding-right: 40px;
            }
        }

        .icon-1 {
            width: 1.9688rem;
            height: 1.6250rem;

            @include pc {
                width: 96.9px;
                height: 80px;
            }
        }

        .icon-2 {
            width: 2.0313rem;
            height: 1.2813rem;

            @include pc {
                width: 127.761px;
                height: 80px;
            }
        }

        .statistics-card-integral-team {
            display: flex;
            align-items: center;

            // width: 50%;
            @include pc {
                display: block;
            }

            @include h5 {
                text-align: center;
            }
        }

        .statistics-card-integral-team-name {
            font-size: 0.6875rem;
            color: var(--TAB-);

            @include pc {
                color: var(--TAB-, #5B6DA1);
                font-family: PingFang SC;
                font-size: 22px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
        }

        .statistics-card-integral-team-num {

            color: #14D03D;
            font-size: 0.6875rem;

            @include h5 {
                padding-left: 0.3750rem;
            }

            @include pc {
                color: #14D03D;
                font-family: PingFang SC;
                font-size: 22px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
                padding-top: 8px;
            }
        }

        &:last-child {
            @include h5 {
                margin-top: 0.625rem;
            }
        }
    }

    .botton-view {
        // margin-left: 0.6250rem;
        // margin-right: 0.6250rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include pc {
            padding-right: 1px;
        }

        .button {
            width: 8.9688rem;
            height: 2.6563rem;
            border-radius: 0.1087rem;
            line-height: 2.6563rem;
            text-align: center;
            font-size: 0.8750rem;
            margin-left: 0;
            margin-right: 0;
            font-weight: 400 !important;
            display: flex;
            justify-content: center
        }

        .receber {
            // color: #000000;
            // background-color: #21DD2D;
            @include button(#21DD2D);
            width: 4.2500rem;
            height: 1.6875rem;
            border-radius: 0.5000rem;
            background: var(--Linear);

            @include pc {
                padding: 13px 48px;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                border-radius: 8px;
            }
        }

        .btn {
            border-radius: 0.5000rem;

            @include pc {
                border-radius: 8px;

            }
        }

        .registo {
            @include button(#21DD2D);
            width: calc(4.2500rem - 2px);
            height: calc(1.6875rem - 2px);
            border-radius: 0.5000rem;
            background: var(--H5-);
            // border: 1px solid #29ACC9;

            // box-sizing: border-box;
            @include pc {
                padding: 12px 47px;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
        }
    }
}

.bb-card {
    @include pc {
        display: flex;
        justify-content: space-between;
        padding-bottom: 64px;
    }
}

.ad-card {

    display: flex;
    justify-content: space-between;
    // background: linear-gradient(90deg, #0FF 0.16%, #FF92FF 99.84%);
    background: #222343 linear-gradient(90deg, rgba(0, 255, 255, 0.1) 0.16%, rgba(255, 146, 255, 0.1) 99.84%);
    border-radius: 0.5000rem;
    position: relative;

    @include pc {
        width: calc(50% - 70px);
        border-radius: 16px;
        padding: 30px;
        background-image: url(@/assets/new/agent/rrpc.png);
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: calc(0% + 30px) calc(100% - 30px);
    }

    @include h5 {
        padding: 0 1.0625rem;
    }


    .ddk {
        position: absolute;
        // text-align: center;
        bottom: 0.8125rem;
        color: var(--MENU, #8E90CD);
        font-family: Alibaba PuHuiTi 2.0;
        // font-size: 0.7500rem;
        font-size: 0.3125rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: 1.1187rem;
        text-transform: uppercase;

        // transform: scale(0.416);
        @include pc {
            color: var(--MENU, #8E90CD);
            font-family: Alibaba PuHuiTi 2.0;
            font-size: 10px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            letter-spacing: 35.8px;
            text-transform: uppercase;
            opacity: 0.3;
        }
    }

    .ad-card-text {
        width: 50%;
        padding-top: 1.3438rem;

        @include pc {}

        .p1 {
            color: var(--TAB-3, #FFF);
            font-family: PingFang SC;
            font-size: 0.8750rem;
            font-style: normal;
            font-weight: 600;
            line-height: normal;

            @include pc {
                color: #88A2EB;
                font-family: PingFang SC;
                font-size: 28px;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }
        }

        .p2 {
            color: var(--MENU, #8E90CD);
            padding-top: 0.9375rem;
            font-family: PingFang SC;
            font-size: 0.7500rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            @include pc {
                padding-top: 23px;
                color: #0FF;
                font-family: PingFang SC;
                font-size: 20px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
        }
    }

    .ad-card-img {
        width: 7.5625rem;
        height: 7.5625rem;

        @include pc {
            width: 260px;
            height: 260px;
        }

        img {
            width: 100%;
            height: 100%;
        }
    }

    .icon {
        width: 1.8750rem;
        margin-left: auto;
        cursor: pointer;
        fill: #9BA6B3;

        &:active {
            fill: #21DC2D;
        }
    }
}

.qr-card {
    // background-color: #1C1E22;
    // margin: 0.6250rem;
    // padding: 0.6250rem 0;
    border-radius: 0.1087rem;
    padding-top: 0.625rem;

    @include pc {
        width: calc(50% - 70px);
        background-color: #19173A;
        border-radius: 16px;
        padding: 30px;
    }

    .qr-card-view {
        padding-top: 0.6250rem;
        text-align: center;

        .uv-qrcode {
            margin: auto;
            // padding: 0.6250rem ;
            // background-color: #FFFFFF;
        }

        img {
            width: 7.7750rem;
            height: 7.7750rem;
        }

        .botton-view {
            margin-left: 1.0000rem;
            margin-right: 1.0000rem;
            display: flex;
            justify-content: space-around;
            margin-top: 1.2500rem;

            .button {
                // width: 8.9688rem;
                padding: 0 0.6250rem;
                height: 2.6563rem;
                border-radius: 0.1087rem;
                line-height: 2.6563rem;
                text-align: center;
                font-size: 0.7813rem;
                margin-left: 0;
                margin-right: 0;
                font-weight: bold;
            }

            .receber {
                @include button(#21DD2D);
            }


        }
    }
}

.url-copy-team {
    padding-bottom: 0.625rem;
    font-size: 0.7813rem;

    @include pc {
        padding-bottom: 20px;
    }

    .url-copy-team-name {
        color: var(--MENU, #8E90CD);
        padding-bottom: 0.4688rem;

        @include pc {
            color: var(--TAB-, #5B6DA1);
            font-family: PingFang SC;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
            padding-bottom: 12px;
            display: flex;
            align-items: center;

            img {
                width: 20px;
                height: 20px;
                margin-right: 12px;
            }

            /* 112.5% */
        }
    }


    .url-copy-team-view {
        color: var(--INPUT-TEXT, #B5EBFF);
        // line-height: 2.6250rem;
        display: flex;
        // text-indent: 0.9375rem;
        border-radius: 0.5000rem;
        align-items: center;

        @include h5 {
            padding: 0.6250rem;
            justify-content: space-between;
            background: var(--INPUT, #231D4E);
        }

        @include pc {
            gap: 12px;

            &.ds {
                padding: 0.6250rem;
                justify-content: space-between;
                background: var(--INPUT, #231D4E);
            }
        }

        text {
            width: calc(100% - 3.8750rem);

            @include pc {
                font-size: 16px;
                font-style: normal;
                font-weight: 500;
            }
        }

        .copy-svg {
            width: 1.8750rem;
            height: 1.8750rem;
            display: flex;
            text-align: center;
            justify-content: center;
            align-items: center;
            background: #2E2C5E;
            border-radius: 0.3750rem;

            svg {
                width: 1.0313rem !important;
                height: 1.0313rem !important;
            }
        }

        .share-team {
            padding: 0.625rem 0;
            // display: flex;
            justify-content: center;
            text-align: center;
            width: 3.6250rem;

            @include pc {
                width: 80px;
                padding: 15px 0 20px;
                border-radius: 16px;
                background: #201E47;
            }

            svg {
                width: 1.8750rem;
                height: 1.8750rem;

            }

            span {
                display: block;
                color: var(--MENU, #8E90CD);
                font-family: PingFang SC;
                font-size: 0.5625rem;
                font-style: normal;
                font-weight: 300;
                line-height: normal;
                padding-top: 0.2500rem;

                @include pc {
                    text-align: center;
                    font-size: 14px;
                }
            }
        }
    }
}

.popup-div {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    font-family: SWISCC;

    .mark {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .6);
    }


    .content-box {
        box-sizing: border-box;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        width: 85%;
        padding: 1.25rem .625rem;

        .close {
            position: fixed;
            top: .3125rem;
            right: .625rem;
            fill: #131313;
            width: 1.25rem;
            height: 1.25rem;
        }

        .title {
            text-align: center;
            font-weight: 700;
            color: #009d81;
            font-size: 1.25rem;
            margin-top: .625rem;
        }

        .content {
            ul {
                list-style-type: decimal;
                font-weight: 700;
                font-family: SWISSC;
            }

            li {
                margin: .3125rem 0;
                font-size: .875rem;
            }

            .notice {
                color: grey;
                font-size: .875rem;
                margin-left: 1.375rem;
            }
        }
    }

    .close {
        position: relative;
        width: 30px;
        height: 30px;

        &::after {
            content: "";
            position: fixed;
            right: 1.25rem;
            background: #000;
            top: 1.25rem;
            width: 100%;
            height: .125rem;
            transform: translateX(90deg);
        }

    }
}
</style>