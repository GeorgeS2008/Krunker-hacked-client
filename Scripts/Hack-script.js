// ==UserScript==
// @name           Maniac Hacks
// @author         Maniac Studios
// @description    A sick krunker hack script.
// @version        1.1
// @icon           https://mir-s3-cdn-cf.behance.net/project_modules/disp/c4a0b7108332641.5fbbbc9c5bf36.png
// @grant          GM.setValue
// @grant          GM_getValue
// @match          https://krunker.io/*
// @match          https://*.browserfps.com/*
// @extracted      Fri, 08 Oct 2021 19:54:10 GMT
// @run-at         document-start
// @noframes
// ==/UserScript==

(() => {
    var t = {
            2220: (t, e, i) => {
                'use strict';
                var {
                    api: r,
                    meta: s,
                    utils: a,
                    loader: n,
                    frame: o
                } = i(9606), {
                    vars: h
                } = n, c = i(3363), l = i(4304), d = i(914), u = i(82), f = i(4432);
                (t.exports = new class {
                    constructor() {
                        this.hooked = Symbol(), this.canvas = a.add_ele('canvas', o), this.ctx = this.canvas.getContext('2d'), this.init_interface(), this.utils = new f(this.interface), this.input = new c(this.interface), this.visual = new d(this.interface), window.addEventListener('resize', (() => this.resize_canvas())), this.resize_canvas(), this.skins = [...Array(5e3)].map(((t, e) => ({
                            ind: e,
                            cnt: 1
                        }))), this.menu = i(3847), n.on('instruct', (t => {
                            this.config.game.auto_lobby && t('connection error', 'game is full', 'kicked by vote', 'disconnected') ? location.href = '/' : !this.config.game.auto_start || !t('to play') || this.player && this.player.active || (this.controls.locklessChange(!0), this.controls.locklessChange(!1))
                        }))
                    }
                    get players() {
                        return this.game.players.list.map((t => this.add(t)))
                    }
                    add(t) {
                        return t[this.hooked] || (t[this.hooked] = new l(this.interface, t))
                    }
                    init_interface() {
                        var t = this;
                        this.interface = {
                            get ctx() {
                                return t.ctx
                            }, get utils() {
                                return t.utils
                            }, get visual() {
                                return t.visual
                            }, get game() {
                                return t.game
                            }, get socket() {
                                return t.socket
                            }, get three() {
                                return t.three
                            }, get world() {
                                return t.world
                            }, get force_auto() {
                                return t.config.aim.force_auto
                            }, get color() {
                                return t.config.colors
                            }, get rainbow() {
                                return t.config.esp.rainbow
                            }, get controls() {
                                return t.controls
                            }, get player() {
                                return t.player
                            }, get target() {
                                return t.target
                            }, get players() {
                                return t.players
                            }, get inactivity() {
                                return t.config.game.inactivity
                            }, get esp() {
                                return t.config.esp.status
                            }, get wireframe() {
                                return t.config.player.wireframe
                            }, get walls() {
                                return t.config.esp.walls
                            }, get bhop() {
                                return t.config.player.bhop
                            }, get spinbot() {
                                return t.config.aim.spinbot
                            }, get aim() {
                                return t.config.aim.status
                            }, get aim_offset() {
                                return t.config.aim.offset
                            }, get wallbangs() {
                                return t.config.aim.wallbangs
                            }, get aim_fov() {
                                return t.config.aim.fov
                            }, get aim_smooth() {
                                return t.config.aim.smooth
                            }, get hitchance() {
                                return t.config.aim.hitchance
                            }, get auto_reload() {
                                return t.config.aim.auto_reload
                            }, get unlock_skins() {
                                return t.config.player.skins
                            }, pick_target() {
                                t.target = t.players.filter((t => t.can_target && t.rect)).sort(((e, i) => t.dist2d(e, i) * (e.frustum ? 1 : .5)))[0]
                            }, get proxy() {
                                return t.config.game.proxy
                            }
                        }
                    }
                    async load() {
                        this.utils.add_ele('style', (() => document.documentElement), {
                            textContent: i(1465)
                        }), await this.menu.load_config();
                        var t = Symbol(),
                            e = this;
                        await n.load({
                            WebSocket: u(this.interface)
                        }, {
                            three: t => this.three = t,
                            game: t => this.game = t,
                            controls: t => this.controls = t,
                            time: t => this.config.game.inactivity ? 1 / 0 : t,
                            world: t => this.world = t,
                            can_see: t => 'full' != this.config.esp.status && (this.config.esp.nametags || t),
                            skins: i => Object.defineProperty(i, 'skins', {
                                get() {
                                    return e.config.player.skins ? e.skins : this[t]
                                },
                                set(e) {
                                    return this[t] = e
                                }
                            }),
                            input: this.input,
                            socket: t => this.socket = t
                        }), this.process = this.process.bind(this), this.process()
                    }
                    resize_canvas() {
                        this.canvas.width = window.innerWidth, this.canvas.height = window.innerHeight
                    }
                    process() {
                        try {
                            if (this.visual.tick(), this.config.aim.fov_box && this.visual.fov(this.config.aim.fov), this.game && this.world)
                                for (let t of this.game.players.list) {
                                    let e = this.add(t);
                                    e.is_you && (this.player = e), e.active && (e.tick(), e.frustum && !e.is_you && (this.config.esp.tracing && this.visual.tracer(e), ['box', 'box_chams', 'full'].includes(this.config.esp.status) && this.visual.box(e), 'full' == this.config.esp.status && (this.visual.health(e), this.visual.text_clean(e)), this.visual.cham(e)))
                                }
                            this.config.game.auto_nuke && this.player && 25 == this.player.streaks.length && this.socket.send('k', 0)
                        } catch (t) {
                            n.report_error('frame', t)
                        }
                        this.utils.request_frame(this.process)
                    }
                    get config() {
                        return this.menu.config
                    }
                    dist2d(t, e) {
                        return this.utils.dist_center(t.rect) - this.utils.dist_center(e.rect)
                    }
                }).load()
            },
            2871: t => {
                'use strict';
                t.exports = {
                    name: 'Maniac Hacks',
                    author: 'Maniac Studios',
                    description: 'Junk in Your Krunk Guaranteed',
                    version: '1.1',
                    license: 'gpl-3.0',
                    namespace: 'https://greasyfork.org/users/704479',
                    icon: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/c4a0b7108332641.5fbbbc9c5bf36.png',
                    grant: ['GM.setValue', 'GM_getValue'],
                    match: ['https://krunker.io/*', 'https://*.browserfps.com/*']
                }
            },
            3847: (t, e, i) => {
                'use strict';
                localStorage.ssconfig && !localStorage.ssjunkerconfig && (localStorage.ssjunkerconfig = localStorage.ssconfig);
                var r = i(2871),
                    s = (i(8144), i(4447)),
                    a = i(9853),
                    n = i(9133),
                    o = new s('Maniac hacks', r.icon, 'junkerconfig'),
                    {
                        api: h,
                        utils: c,
                        meta: r
                    } = i(9606),
                    l = c.wait_for((() => document.body));
                s.keybinds.add({
                    code: 'F1',
                    interact() {
                        document.exitPointerLock(), o.window.show()
                    }
                }), o.load_addon(a, fetch(new URL('code.txt', r.discord), {
                    cache: 'no-store'
                }).then((t => t.text()))), o.load_addon(n), o.add_preset('Default', {
                    esp: {
                        status: 'off',
                        tracing: !1,
                        wireframe: !1,
                        rainbow: !1
                    },
                    colors: {
                        rainbow: !1,
                        risk: '#FF7700',
                        hostile: '#FF0000',
                        friendly: '#00FF00'
                    },
                    aim: {
                        status: 'off',
                        auto_reload: !1,
                        fov: 60,
                        hitchance: 100,
                        offset: 'random',
                        smooth: 0,
                        wallbangs: !1,
                        force_auto: !1,
                        spinbot: !1
                    },
                    player: {
                        bhop: 'off',
                        skins: !1
                    },
                    ui: {
                        show_adverts: !1,
                        show_streams: !0,
                        show_merch: !0,
                        show_news: !0,
                        show_cookie: !0,
                        show_button: !0,
                        css: ''
                    },
                    game: {
                        proxy: !1,
                        auto_nuke: !1,
                        auto_lobby: !1,
                        auto_start: !1,
                        inactivity: !1
                    },
                    audio: {
                        stream: 'off',
                        volume: .5
                    }
                }), o.add_preset('Assist', {
                    aim: {
                        status: 'assist',
                        fov: 70,
                        offset: 'random',
                        smooth: .6
                    },
                    player: {
                        bhop: 'keyslide'
                    }
                }), o.add_preset('Rage', {
                    esp: {
                        status: 'full',
                        tracing: !0
                    },
                    aim: {
                        status: 'auto',
                        fov: 110,
                        smooth: 0,
                        auto_reload: !0,
                        wallbangs: !0,
                        offset: 'multi',
                        spinbot: !0
                    },
                    player: {
                        bhop: 'autoslide'
                    }
                });
                var d = o.window.tab('Render');
                d.control('Draw FOV box', {
                    type: 'boolean',
                    walk: 'aim.fov_box'
                });
                var u = d.category('ESP');
                u.control('Type of ESP', {
                    type: 'select',
                    walk: 'esp.status',
                    value: {
                        off: 'Off',
                        box: 'Box',
                        chams: 'Chams',
                        box_chams: 'Box & Chams',
                        full: 'Full'
                    }
                }), u.control('Tracing', {
                    type: 'boolean',
                    walk: 'esp.tracing'
                }), u.control('Wireframe', {
                    type: 'boolean',
                    walk: 'esp.wireframe'
                }), u.control('Hostile Color', {
                    type: 'color',
                    walk: 'colors.hostile'
                }), u.control('Risk Color', {
                    type: 'color',
                    walk: 'colors.risk'
                }), u.control('Friendly Color', {
                    type: 'color',
                    walk: 'colors.friendly'
                }), u.control('Rainbow Color', {
                    type: 'boolean',
                    walk: 'colors.rainbow'
                });
                var f = d.category('UI'),
                    p = c.add_ele('link', (() => document.documentElement), {
                        rel: 'stylesheet'
                    });
                f.control('Custom CSS', {
                    type: 'textbox',
                    walk: 'ui.css',
                    placeholder: 'CSS Url'
                }).on('change', (t => {
                    '' != t && (p.href = t)
                })), f.control('Show Menu Button ( [F1] to show )', {
                    type: 'boolean',
                    walk: 'ui.show_button'
                }).on('change', (t => {
                    t ? o.button.show() : o.button.hide()
                })), f.control('Show Advertisments', {
                    type: 'boolean',
                    walk: 'ui.show_adverts'
                }).on('change', (async t => (await l).classList[t ? 'remove' : 'add']('hide-adverts'))), f.control('Show Streams', {
                    type: 'boolean',
                    walk: 'ui.show_streams'
                }).on('change', (async t => (await l).classList[t ? 'remove' : 'add']('hide-streams'))), f.control('Show Merch', {
                    type: 'boolean',
                    walk: 'ui.show_merch'
                }).on('change', (async t => (await l).classList[t ? 'remove' : 'add']('hide-merch'))), f.control('Show News Console', {
                    type: 'boolean',
                    walk: 'ui.show_news'
                }).on('change', (async t => (await l).classList[t ? 'remove' : 'add']('hide-news'))), f.control('Show Security Button', {
                    type: 'boolean',
                    walk: 'ui.show_cookie'
                }).on('change', (async t => (await l).classList[t ? 'remove' : 'add']('hide-security')));
                var m = o.window.tab('Weapon'),
                    y = m.category('Patches');
                y.control('Auto Reload', {
                    type: 'boolean',
                    walk: 'aim.auto_reload'
                }), y.control('Force auto-fire', {
                    type: 'boolean',
                    walk: 'aim.force_auto'
                });
                var v = m.category('Aimbot');
                v.control('Mode', {
                    type: 'select',
                    walk: 'aim.status',
                    value: {
                        off: 'Off',
                        trigger: 'Triggerbot',
                        correction: 'Correction',
                        assist: 'Assist',
                        auto: 'Automatic'
                    }
                }), v.control('Offset', {
                    type: 'select',
                    walk: 'aim.offset',
                    value: {
                        head: 'Head',
                        torso: 'Torso',
                        legs: 'Legs',
                        random: 'Random'
                    }
                }), v.control('Smoothness', {
                    type: 'slider',
                    walk: 'aim.smooth',
                    min: 0,
                    max: 1,
                    step: .1
                }), v.control('Hitchance', {
                    type: 'slider',
                    walk: 'aim.hitchance',
                    min: 10,
                    max: 100,
                    step: 10
                }), v.control('FOV', {
                    type: 'slider',
                    walk: 'aim.fov',
                    min: 10,
                    max: 110,
                    step: 10,
                    labels: {
                        110: 'Inf'
                    }
                }), v.control('Wallbangs', {
                    type: 'boolean',
                    walk: 'aim.wallbangs'
                }), v.control('Spinbot', {
                    type: 'boolean',
                    walk: 'aim.spinbot'
                });
                var w = o.window.tab('Player');
                w.control('Auto Bhop Mode', {
                    type: 'select',
                    walk: 'player.bhop',
                    value: {
                        off: 'Off',
                        keyjump: 'Key Jump',
                        keyslide: 'Key Slide',
                        autoslide: 'Auto Slide',
                        autojump: 'Auto Jump'
                    }
                }), w.control('Unlock Skins', {
                    type: 'boolean',
                    walk: 'player.skins'
                });
                var x = o.window.tab('Game');
                x.control('Proxy', {
                    type: 'boolean',
                    walk: 'game.proxy'
                }).on('change', ((t, e) => !e && location.assign('/'))), x.control('Auto Activate Nuke', {
                    type: 'boolean',
                    walk: 'game.auto_nuke'
                }), x.control('Auto Start Match', {
                    type: 'boolean',
                    walk: 'game.auto_start'
                }), x.control('New Lobby Finder', {
                    type: 'boolean',
                    walk: 'game.auto_lobby'
                }), x.control('No Inactivity kick', {
                    type: 'boolean',
                    walk: 'game.inactivity'
                });
                var g = o.window.tab('Audio');
                g.control('Stream', {
                    type: 'select',
                    walk: 'audio.stream',
                    value: {
                        off: 'Off',
                        'http://0n-2000s.radionetz.de/0n-2000s.aac': 'German and/or English music',
                        'https://stream-mixtape-geo.ntslive.net/mixtape2': 'Hip Hop music',
                        'https://live.wostreaming.net/direct/wboc-waaifmmp3-ibc2': 'Classic country music',
                        'http://streaming.radionomy.com/A-RADIO-TOP-40': 'Dance/disco music',
                        'http://bigrradio.cdnstream1.com/5106_128': 'Pop music',
                        'http://strm112.1.fm/ajazz_mobile_mp3': 'Ya like Jizz?',
                        'http://strm112.1.fm/60s_70s_mobile_mp3': 'Old',
                        'http://strm112.1.fm/club_mobile_mp3': 'Club music',
                        'https://freshgrass.streamguys1.com/irish-128mp3': 'Folky music',
                        'http://1a-classicrock.radionetz.de/1a-classicrock.mp3': 'Rocker music',
                        'http://streams.radiobob.de/metalcore/mp3-192': 'Heavy Metal Music',
                        'http://stream.laut.fm/beatdownx': 'Death Metal/Heavy metal',
                        'http://live-radio01.mediahubaustralia.com/FM2W/aac/': 'Classic',
                        'http://bigrradio.cdnstream1.com/5187_128': 'Alternative music',
                        'http://streaming.radionomy.com/R1Dubstep?lang=en': 'DubStep music',
                        'http://streams.fluxfm.de/Chillhop/mp3-256': 'LoFi HipHop',
                        'http://streams.90s90s.de/hiphop/mp3-128/': 'Hip Hop Oldschool'
                    }
                }).on('change', (function(t) {
                    'off' != t ? (this.audio ? this.audio.src = t : (this.audio = new Audio(t), console.log(o.config), this.audio.volume = o.config.audio.volume), this.audio.load(), this.audio.play()) : this.audio && (this.audio.pause(), this.audio.currentTime = 0, delete this.audio)
                })), g.control('Audio Volume', {
                    type: 'slider',
                    walk: 'audio.volume',
                    min: 0,
                    max: 1,
                    step: .05
                }), o.window.tab('Developer').control('Lazy Programma in maniac studios', {
                    type: 'function',
                    value() {
                        var t = c.add_ele('a', document.documentElement, {
                            href: Request.resolve({
                                target: '',
                                endpoint: '',
                                query: {
                                    download: !0
                                }
                            })
                        });
                        t.click(), t.remove()
                    }
                }), t.exports = o
            },
            2311: t => {
                'use strict';
                t.exports = class {
                    ls_prefix = 'ss';
                    gm = 'function' == typeof GM_getValue;
                    get(t, e) {
                        var i = this.get_raw(t);
                        if ('string' == typeof i) try {
                            return JSON.parse(i)
                        } catch (t) {
                            return console.error('DATASTORE ERROR', t, i), i
                        }
                        switch (e) {
                            case 'object':
                                return {};
                            case 'array':
                                return []
                        }
                    }
                    set(t, e) {
                        return e instanceof Set && (e = [...e]), this.set_raw(t, JSON.stringify(e))
                    }
                    get_raw(t) {
                        return this.gm ? GM_getValue(t) : localStorage.getItem(this.ls_prefix + t)
                    }
                    set_raw(t, e) {
                        return this.gm ? GM.setValue(t, e) : localStorage.setItem(this.ls_prefix + t, e)
                    }
                }
            },
            6425: (t, e, i) => {
                'use strict';
                var r = new(i(3619));
                class s {
                    utf8_dec = new TextDecoder('utf8');
                    constructor(t) {
                        this.data = t, this.name = t.name || '', this.size = t.size || 0
                    }
                    read(t) {
                        var e = new FileReader;
                        return new Promise(((i, r) => {
                            e.addEventListener('load', (() => {
                                switch (t) {
                                    case 'text':
                                    default:
                                        i(this.utf8_dec.decode(e.result));
                                        break;
                                    case 'buffer':
                                        i(e.result)
                                }
                            }), {
                                once: !0
                            }), e.readAsArrayBuffer(this.data)
                        }))
                    }
                    static pick(t = {}) {
                        var e = r.add_ele('input', document.documentElement, {
                            type: 'file',
                            style: {
                                display: 'none'
                            }
                        });
                        return Array.isArray(t.accept) && e.setAttribute('accept', t.accept.join(', ')), t.multipe && e.setAttribute('multiple', ''), new Promise(((i, r) => {
                            e.addEventListener('change', (() => {
                                var r = [];
                                for (let t of e.files) r.push(new s(t));
                                i(t.multiple ? r : r[0])
                            }), {
                                once: !0
                            }), e.click()
                        }))
                    }
                    static save(t = {}) {
                        var e = r.add_ele('a', document.documentElement, {
                            href: URL.createObjectURL(new Blob([t.data])),
                            download: t.name || '',
                            type: 'file'
                        });
                        e.click(), e.remove()
                    }
                }
                t.exports = s
            },
            1191: (t, e, i) => {
                'use strict';
                var {
                    utils: r
                } = i(3432);
                t.exports = class {
                    container = r.add_ele('div', (() => document.documentElement), {
                        style: {
                            top: 0,
                            left: 0,
                            'z-index': 9999999999,
                            border: 'none',
                            position: 'absolute',
                            background: '#0000',
                            width: '100vw',
                            height: '100vh',
                            overflow: 'hidden'
                        }
                    });
                    content = this.container.attachShadow({
                        mode: 'open'
                    });
                    constructor() {
                        this.update = this.update.bind(this), window.addEventListener('mousemove', this.update), window.addEventListener('mousedown', this.update), window.addEventListener('mouseup', this.update)
                    }
                    panels = new Set;
                    update(t) {
                        for (let e of this.panels) {
                            if (!e.visible) continue;
                            let i = e.node.getBoundingClientRect();
                            if (t.clientX >= i.x && t.clientY >= i.y && t.clientX - i.x <= i.width && t.clientY - i.y <= i.height) return this.container.style['pointer-events'] = 'all'
                        }
                        if (this.container.style['pointer-events'] = 'none', 'mousedown' == t.type)
                            for (let t of this.panels) t.blur()
                    }
                    added_css = new Set;
                    css(t, e) {
                        return !this.added_css.has(t) && (this.added_css.add(t), r.add_ele('style', this, {
                            textContent: e
                        }), !0)
                    }
                    append(t) {
                        this.content.append(t)
                    }
                }
            },
            3432: (t, e, i) => {
                'use strict';
                var r = i(2311),
                    s = new(i(7263));
                e.utils = s, e.store = new r
            },
            3363: (t, e, i) => {
                'use strict';
                var r = i(2176),
                    {
                        Vector3: s
                    } = i(4914),
                    {
                        loader: a,
                        api: n
                    } = i(9606),
                    {
                        vars: o,
                        gconsts: h
                    } = a,
                    c = 2 * Math.PI;
                t.exports = class {
                    smooth_map = {
                        0: 1,
                        .1: .05,
                        .2: .1,
                        .3: .08,
                        .4: .07,
                        .5: .06,
                        .6: .05,
                        .7: .04,
                        .8: .03,
                        .9: .02,
                        1: .01
                    };
                    constructor(t) {
                        this.data = t
                    }
                    push(t) {
                        if (this.data.player && this.data.controls) try {
                            var e = new r(t);
                            this.modify(e), this.timers(e), e.done()
                        } catch (t) {
                            a.report_error('input', t)
                        }
                        return t
                    }
                    aim_input(t, e) {
                        e.xdir = t.x, e.ydir = t.y
                    }
                    aim_camera(t, e) {
                        this.data.controls[o.pchObjc].rotation.x = t.x, this.data.controls.object.rotation.y = t.y, this.aim_input(t, e)
                    }
                    correct_aim(t, e) {
                        e.shoot && (e.shoot = !this.data.player.shot), !e.reload && this.data.player.has_ammo && e.shoot && !this.data.player.shot && this.aim_input(t, e)
                    }
                    enemy_sight() {
                        if (!this.data.player.shot) {
                            var t = new this.data.three.Raycaster;
                            return t.setFromCamera({
                                x: 0,
                                y: 0
                            }, this.data.world.camera), !(!this.data.player.aimed || !t.intersectObjects(this.data.players.filter((t => t.can_target)).map((t => t.obj)), !0).length) || void 0
                        }
                    }
                    smooth(t, e, i, r) {
                        var s = this.data.utils.getAngleDst(t.xdir, e.x),
                            a = this.data.utils.getAngleDst(t.ydir, e.y);
                        return {
                            y: t.ydir + a * i,
                            x: t.xdir + s * r
                        }
                    }
                    bhop(t) {
                        if (-1 != t.move) {
                            var e = this.data.bhop,
                                i = e.startsWith('auto'),
                                r = (e.startsWith('key'), e.endsWith('slide')),
                                s = r || e.endsWith('jump');
                            t.focused && (s && (i || t.keys.has('Space')) && (this.data.controls.keys[this.data.controls.binds.jump.val] ^= 1, this.data.controls.keys[this.data.controls.binds.jump.val] && (this.data.controls.didPressed[this.data.controls.binds.jump.val] = 1)), r && (i || t.keys.has('Space')) && this.data.player.velocity.y < -.02 && this.data.player.can_slide && (setTimeout((() => this.data.controls.keys[this.data.controls.binds.crouch.val] = 0), 325), this.data.controls.keys[this.data.controls.binds.crouch.val] = 1))
                        }
                    }
                    spin_count = 0;
                    spinbot(t) {
                        t.xdir = this.data.utils.deg2rad(-90)
                    }
                    spinbot_pre(t) {
                        t.crouch = -1 == t.move, t.scope = t.scope || t.crouch, t.ydir += c * (1e9 * (this.spin_count ^= 1))
                    }
                    anti_offset(t) {
                        t.x -= this.data.world.shakeY, t.x -= this.data.player.entity.recoilAnimY * h.recoilMlt, t.x -= .1 * this.data.player.entity.landBobY
                    }
                    move = 0;
                    timers(t) {
                        this.data.player.can_shoot && t.shoot && !this.data.player.shot ? (this.data.player.shot = !0, setTimeout((() => this.data.player.shot = !1), this.data.player.weapon.rate + 1)) : this.data.spinbot && this.spinbot(t)
                    }
                    move_ticks(t, e, i) {
                        for (; e--;) t.next((t => (t.move = i, t.xdir += .002)))
                    }
                    modify(t) {
                        this.data.inactivity && -1 == t.move && this.move++ % 200 == 0 && (this.move_ticks(t, 4, 1), this.move_ticks(t, 4, 5)), this.data.spinbot && this.spinbot_pre(t), this.bhop(t), this.data.player.has_ammo || 'auto' != this.data.aim && !this.data.auto_reload || (t.reload = !0), t.could_shoot = this.data.player.can_shoot, this.data.force_auto && this.data.player.did_shoot && (t.shoot = !1);
                        var e = this.data.player.weapon_auto || this.data.player.weapon.burst || !t.shoot || !t.previous.could_shoot || !t.previous.shoot,
                            i = 100 * Math.random() < this.data.hitchance,
                            r = 'auto' == this.data.aim || t.scope || t.shoot;
                        this.data.player.weapon.burst && (this.data.player.shot = this.data.player.did_shoot);
                        for (let t of this.data.players) t.calc_parts();
                        if (r && this.data.pick_target(), this.data.player.can_shoot)
                            if ('trigger' == this.data.aim) t.shoot = this.enemy_sight() || t.shoot;
                            else if ('off' != this.data.aim && this.data.target && this.data.player.health) {
                            var s = this.data.target.calc_rot();
                            if (this.anti_offset(s), i && ('correction' == this.data.aim && e ? this.correct_aim(s, t) : 'auto' == this.data.aim && (this.data.player.can_aim && (t.scope = !0), this.data.player.aimed && (t.shoot = !this.data.player.shot), this.correct_aim(s, t))), 'assist' == this.data.aim && this.data.player.aim_press) {
                                let e = this.smooth_map[this.data.aim_smooth] || (console.warn(this.data.aim_smooth, 'not registered'), 1),
                                    r = this.smooth_map[+Math.min(3 * this.data.aim_smooth, 1).toFixed(1)];
                                s = this.smooth(t, s, e, r), this.aim_camera(s, t), !t.shoot || this.data.player.shot || i || (t.xdir = 0)
                            }
                        }
                        t.shoot && this.data.player.shot && (t.shoot = !e)
                    }
                }
            },
            2176: t => {
                'use strict';
                var e = new Set,
                    i = {
                        frame: 0,
                        delta: 1,
                        xdir_r: 2,
                        ydir_r: 3,
                        move: 4,
                        shoot: 5,
                        scope: 6,
                        jump: 7,
                        reload: 8,
                        crouch: 9,
                        weapon_scroll: 10,
                        weapon_swap: 11,
                        move_lock: 12,
                        speed_limit: 13,
                        reset: 14,
                        tween_time: 15,
                        tween_progress: 16
                    };
                class r {
                    static next = [];
                    constructor(t) {
                        this.array = t;
                        var e = r.next.shift();
                        'function' == typeof e && e(this)
                    }
                    get previous() {
                        return r.previous
                    }
                    next(t) {
                        r.next.push(t)
                    }
                    done() {
                        r.previous = this
                    }
                    get keys() {
                        return 'INPUT' == document.activeElement.tagName ? new Set : e
                    }
                    get focused() {
                        return null != document.pointerLockElement
                    }
                    get xdir() {
                        return this.xdir_r / 1e3
                    }
                    set xdir(t) {
                        return this.xdir_r = 1e3 * t, t
                    }
                    get ydir() {
                        return this.ydir_r / 1e3
                    }
                    set ydir(t) {
                        return this.ydir_r = 1e3 * t, t
                    }
                }
                document.addEventListener('keydown', (t => e.add(t.code))), document.addEventListener('keyup', (t => e.delete(t.code))), window.addEventListener('blur', (() => e = new Set));
                for (let t in i) {
                    let e = i[t];
                    Object.defineProperty(r.prototype, t, {
                        get() {
                            return this.array[e]
                        },
                        set(t) {
                            return this.array[e] = 'boolean' == typeof t ? +t : t
                        }
                    })
                }
                t.exports = r, window.InputData = r
            },
            4432: (t, e, i) => {
                'use strict';
                var {
                    loader: r
                } = i(9606), {
                    vars: s
                } = r, a = i(7263);
                t.exports = class extends a {
                    constructor(t) {
                        super(), this.data = t
                    }
                    rgbToHex(t, e, i) {
                        for (var r = (t << 16 | e << 8 | i).toString(16); 6 > r.length;) r = '0' + r;
                        return '#' + r
                    }
                    hexFromHue(t) {
                        var e = t / 60,
                            i = 255 * (1 - Math.abs(e % 2 - 1)),
                            r = Math.floor(e);
                        return this.rgbToHex(1 > r || 4 < r ? 255 : 1 == r || 4 == r ? i : 0, 0 == r || 3 == r ? i : 1 == r || 2 == r ? 255 : 0, 0 == r || 1 == r ? 0 : 3 == r || 4 == r ? 255 : i)
                    }
                    deg2rad(t) {
                        return t * Math.PI / 180
                    }
                    dist_center(t) {
                        return Math.hypot(window.innerWidth / 2 - t.x, window.innerHeight / 2 - t.y)
                    }
                    distanceTo(t, e) {
                        return Math.hypot(t.x - e.x, t.y - e.y, t.z - e.z)
                    }
                    applyMatrix4(t, e) {
                        var i = t.x,
                            r = t.y,
                            s = t.z,
                            a = e.elements,
                            n = 1 / (a[3] * i + a[7] * r + a[11] * s + a[15]);
                        return t.x = (a[0] * i + a[4] * r + a[8] * s + a[12]) * n, t.y = (a[1] * i + a[5] * r + a[9] * s + a[13]) * n, t.z = (a[2] * i + a[6] * r + a[10] * s + a[14]) * n, t
                    }
                    project3d(t, e) {
                        return this.applyMatrix4(this.applyMatrix4(t, e.matrixWorldInverse), e.projectionMatrix)
                    }
                    update_frustum() {
                        this.data.world.frustum.setFromProjectionMatrix((new this.data.three.Matrix4).multiplyMatrices(this.data.world.camera.projectionMatrix, this.data.world.camera.matrixWorldInverse))
                    }
                    update_camera() {
                        this.data.world.camera.updateMatrix(), this.data.world.camera.updateMatrixWorld()
                    }
                    pos2d(t, e = 0) {
                        return isNaN(t.x) || isNaN(t.y) || isNaN(t.z) ? {
                            x: 0,
                            y: 0
                        } : ((t = {
                            x: t.x,
                            y: t.y,
                            z: t.z
                        }).y += e, this.update_camera(), this.project3d(t, this.data.world.camera), {
                            x: (t.x + 1) / 2 * this.data.ctx.canvas.width,
                            y: (1 - t.y) / 2 * this.data.ctx.canvas.height
                        })
                    }
                    obstructing(t) {
                        var e = this.data.wallbangs && (!this.data.player || this.data.player.weapon && this.data.player.weapon.pierce),
                            i = this.camera_world(),
                            r = this.getD3D(i.x, i.y, i.z, t.x, t.y, t.z),
                            s = this.getDir(i.z, i.x, t.z, t.x),
                            a = this.getDir(this.getDistance(i.x, i.z, t.x, t.z), t.y, 0, i.y),
                            n = 1 / (r * Math.sin(s - Math.PI) * Math.cos(a)),
                            o = 1 / (r * Math.cos(s - Math.PI) * Math.cos(a)),
                            h = 1 / (r * Math.sin(a));
                        for (let t of this.data.game.map.manager.objects)
                            if (!t.noShoot && t.active && (!e || !t.penetrable)) {
                                var c = this.lineInRect(i.x, i.z, i.y, n, o, h, t.x - Math.max(0, t.width), t.z - Math.max(0, t.length), t.y - Math.max(0, t.height), t.x + Math.max(0, t.width), t.z + Math.max(0, t.length), t.y + Math.max(0, t.height));
                                if (c && 1 > c) return c
                            } if (this.data.game.map.terrain) {
                            var l = this.data.game.map.terrain.raycast(i.x, -i.z, i.y, 1 / n, -1 / o, 1 / h);
                            if (l) return this.getD3D(i.x, i.y, i.z, l.x, l.z, -l.y)
                        }
                    }
                    getDistance(t, e, i, r) {
                        return Math.sqrt((i -= t) * i + (r -= e) * r)
                    }
                    getD3D(t, e, i, r, s, a) {
                        var n = t - r,
                            o = e - s,
                            h = i - a;
                        return Math.sqrt(n * n + o * o + h * h)
                    }
                    getXDire(t, e, i, r, s, a) {
                        return Math.asin(Math.abs(e - s) / this.getD3D(t, e, i, r, s, a)) * (e > s ? -1 : 1)
                    }
                    getDir(t, e, i, r) {
                        return Math.atan2(e - r, t - i)
                    }
                    lineInRect(t, e, i, r, s, a, n, o, h, c, l, d) {
                        var u = (n - t) * r,
                            f = (c - t) * r,
                            p = (h - i) * a,
                            m = (d - i) * a,
                            y = (o - e) * s,
                            v = (l - e) * s,
                            w = Math.max(Math.max(Math.min(u, f), Math.min(p, m)), Math.min(y, v)),
                            x = Math.min(Math.min(Math.max(u, f), Math.max(p, m)), Math.max(y, v));
                        return !(x < 0 || w > x) && w
                    }
                    getAngleDst(t, e) {
                        return Math.atan2(Math.sin(e - t), Math.cos(t - e))
                    }
                    contains_point(t) {
                        for (let e of this.data.world.frustum.planes)
                            if (e.distanceToPoint(t) < 0) return !1;
                        return !0
                    }
                    camera_world() {
                        var t = this.data.world.camera.matrixWorld.clone(),
                            e = this.data.world.camera[s.getWorldPosition]();
                        return this.data.world.camera.matrixWorld.copy(t), this.data.world.camera.matrixWorldInverse.copy(t).invert(), e.clone()
                    }
                    request_frame(t) {
                        requestAnimationFrame(t)
                    }
                }
            },
            6947: (t, e, i) => {
                'use strict';
                var r = i(7263),
                    s = i(8144),
                    a = i(7846),
                    n = new r;
                class o {
                    gconsts = {
                        playerHeight: 11,
                        cameraHeight: 1.5,
                        headScale: 2,
                        armScale: 1.3,
                        armInset: .1,
                        chestWidth: 2.6,
                        hitBoxPad: 1,
                        crouchDst: 3,
                        recoilMlt: .3,
                        nameOffset: .6,
                        nameOffsetHat: .8
                    };
                    api = 'https://api.sys32.dev/';
                    matchmaker = 'https://matchmaker.krunker.io/';
                    constructor(t, e) {
                        this.has_instruct = this.has_instruct.bind(this), this.stacks = new Set, this.api_v2 = new URL('v2/', this.api), this.meta = n.promise(), this.patches = new Map, this.variables = new Map, this.vars = {}, this.context = {
                            key: '_' + Math.random().toString().substr(2)
                        }, this.badge = '[GameLoader]'
                    }
                    log(...t) {
                        console.log(this.badge, ...t)
                    }
                    var (t, e, i) {
                        return this.variables.set(t, [e, i]), this
                    }
                    patch(t, e, i) {
                        return this.patches.set(t, [e, i]), this
                    }
                    observe() {
                        this.loadp = new Promise((t => new MutationObserver(((e, i) => e.forEach((e => [...e.addedNodes].forEach((e => {
                            'DIV' == e.tagName && 'instructionHolder' == e.id && (this.instruction_holder = e, new MutationObserver((() => setTimeout((() => this.emit('instruct', this.has_instruct)), 200))).observe(this.instruction_holder, {
                                attributes: !0,
                                attributeFilter: ['style']
                            })), 'SCRIPT' == e.tagName && e.textContent.includes('Yendis Entertainment') && (e.textContent = '', t())
                        })))))).observe(document, {
                            childList: !0,
                            subtree: !0
                        })))
                    }
                    has_instruct(...t) {
                        if (!this.instruction_holder) return !1;
                        var e = this.instruction_holder.textContent.trim().toLowerCase();
                        for (let i of t)
                            if (e.includes(t)) return !0;
                        return !1
                    }
                    async report_error(t, e) {
                        if ('object' == typeof e) {
                            var i = {
                                name: e.name,
                                message: e.message,
                                stack: e.stack,
                                where: t
                            };
                            this.stacks.has(e.stack) || (console.error('Where:', t, '\nUncaught', e), this.stacks.add(e.stack), await s({
                                target: this.api_v2,
                                endpoint: 'error',
                                data: i
                            }))
                        }
                    }
                    async show_error(t, e) {
                        await this.load;
                        var i = document.querySelector('#instructionHolder'),
                            r = document.querySelector('#instructions');
                        i.style.display = 'block', i.style.pointerEvents = 'all', r.innerHTML = `<div style='color:#FFF9'>${t}</div><div style='margin-top:10px;font-size:20px;color:#FFF6'>${e}</div>`
                    }
                    async token() {
                        return await this.meta, await s({
                            target: this.api_v2,
                            endpoint: 'token',
                            data: await s({
                                target: this.matchmaker,
                                endpoint: 'generate-token',
                                headers: {
                                    'client-key': this.meta.key
                                },
                                result: 'json'
                            }),
                            result: 'json'
                        })
                    }
                    apply_patches(t) {
                        var e;
                        for (var [i, [r, s]] of this.variables) {
                            var a = (t.match(r) || 0)[s];
                            a ? this.vars[i] = a : (e || (e = {}))[i] = [r, s]
                        }
                        for (var [i, [n, o]] of (console.log('Game Variables:'), console.table(this.vars), e && (console.log('Missing:'), console.table(e)), this.patches)) t.match(n) || console.error('Could not patch', i), t = t.replace(n, o);
                        return t
                    }
                    async license(t) {
                        var e = await s({
                            target: this.api_v2,
                            endpoint: 'meta',
                            data: {
                                ...t,
                                needs_key: !0
                            },
                            method: 'POST',
                            result: 'json'
                        });
                        e.error ? (n.add_ele('style', document.documentElement, {
                            textContent: '#initLoader,#instructionsUpdate{display:none!IMPORTANT}'
                        }), this.show_error(e.error.title, e.error.message), this.meta.reject()) : this.meta.resolve(this.meta = e)
                    }
                    async source() {
                        return await this.meta, await s({
                            target: this.api_v2,
                            endpoint: 'source',
                            query: {
                                build: this.meta.build
                            },
                            result: 'text',
                            cache: !0
                        })
                    }
                    async load(t = {}, e = {}) {
                        var i = {
                                ...t,
                                [this.context.key]: this.context,
                                WP_fetchMMToken: this.token()
                            },
                            r = this.apply_patches(await this.source());
                        Object.assign(this.context, e);
                        try {
                            await this.loadp, new Function(...Object.keys(i), r)(...Object.values(i))
                        } catch (t) {
                            this.report_error('loading', t), this.show_error(t.message, 'Post a screenshot of this error on <a href=\'https://forum.sys32.dev/\'>the forums</a> or <a href=\'/\'>click here</a> to try again.')
                        }
                    }
                }
                a.mixin(o.prototype), t.exports = o
            },
            2034: (t, e, i) => {
                'use strict';
                var r = i(7846);
                class s {
                    constructor(t, e) {
                        this.menu = t, this.window = t.window, this.create(...e)
                    }
                    ready() {
                        console.info(this.name, 'loaded'), this.emit('ready')
                    }
                    create() {}
                }
                r.mixin(s.prototype), t.exports = s
            },
            9969: (t, e, i) => {
                'use strict';
                var {
                    utils: r
                } = i(8203), s = i(7846);
                class a {
                    constructor(t, e, i) {
                        this.data = e, this.name = t, this.category = i, this.menu = this.category.tab.window.menu, this.content = r.add_ele('div', this.category.content, {
                            className: 'settName'
                        }), this.label = r.add_ele('text', this.content), this.create(), this.menu.emit('control', this)
                    }
                    label_text(t) {
                        this.label.nodeValue = t
                    }
                    remove() {
                        this.content.remove()
                    }
                    walk(t) {
                        var e, i, r = this.menu.config;
                        return t.split('.').forEach((t => r = (e = r)[i = t] || {})), [e, i]
                    }
                    get value() {
                        if ('function' == typeof this.data.value) return this.data.value;
                        var t = this.walk(this.data.walk);
                        return t[0][t[1]]
                    }
                    set value(t) {
                        var e = this.walk(this.data.walk);
                        return e[0][e[1]] = t, this.menu.save_config(), this.emit('change', t), t
                    }
                    create() {}
                    interact() {
                        console.warn('No defined interaction for', this)
                    }
                    update(t) {
                        t && this.emit('change', this.value, !0), this.label_text(this.name)
                    }
                    show_content() {
                        this.content.style.display = 'block'
                    }
                    hide_content() {
                        this.content.style.display = 'none'
                    }
                }
                s.mixin(a.prototype);
                class n extends a {
                    static id = 'link';
                    create() {
                        this.link = r.add_ele('a', this.content, {
                            className: 'settingsBtn',
                            textContent: 'Sussy baka'
                        })
                    }
                    update(t) {
                        this.link.textContent = this.value
                    }
                }
                a.Types = [class extends a {
                    static id = 'keybind';
                    create() {
                        this.input = r.add_ele('input', this.content, {
                            className: 'inputGrey2',
                            placeholder: 'Press a key',
                            style: {
                                display: 'inline-block',
                                width: '220px'
                            }
                        }), this.input.addEventListener('focus', (() => {
                            this.input.value = ''
                        })), this.input.addEventListener('keydown', (t => {
                            t.preventDefault(), this.value = 'Escape' == t.code ? null : t.code, this.input.blur()
                        })), this.input.addEventListener('blur', (() => {
                            this.category.update(), this.update()
                        }))
                    }
                    update(t) {
                        super.update(t), this.input.value = r.string_key(this.value)
                    }
                }, class extends a {
                    static id = 'select';
                    create() {
                        this.select = r.add_ele('select', this.content, {
                            className: 'inputGrey2'
                        }), this.select.addEventListener('change', (() => this.value = this.select.value));
                        for (let t in this.data.value) r.add_ele('option', this.select, {
                            value: t,
                            textContent: this.data.value[t]
                        })
                    }
                    update(t) {
                        super.update(t), t && (this.select.value = this.value)
                    }
                }, class extends a {
                    static id = 'boolean';
                    create() {
                        this.switch = r.add_ele('label', this.content, {
                            className: 'switch',
                            textContent: 'Sussy baka',
                            style: {
                                'margin-left': '10px'
                            }
                        }), this.input = r.add_ele('input', this.switch, {
                            type: 'checkbox'
                        }), this.input.addEventListener('change', (() => this.value = this.input.checked)), r.add_ele('span', this.switch, {
                            className: 'slider'
                        })
                    }
                    update(t) {
                        super.update(t), t && (this.input.checked = this.value)
                    }
                }, class extends a {
                    static id = 'function';
                    create() {
                        r.add_ele('div', this.content, {
                            className: 'settingsBtn',
                            textContent: 'Join VLC0 Please'
                        }).addEventListener('click', (() => this.interact()))
                    }
                    interact() {
                        this.value()
                    }
                }, n, class extends a {
                    static id = 'textbox';
                    create() {
                        this.input = r.add_ele('input', this.content, {
                            className: 'inputGrey2',
                            placeholder: this.data.placeholder || '',
                            style: {
                                display: 'inline-block',
                                width: '220px'
                            }
                        }), this.input.addEventListener('change', (() => this.value = this.input.value))
                    }
                    update(t) {
                        super.update(t), t && (this.input.value = this.value)
                    }
                }, class extends a {
                    static id = 'slider';
                    create() {
                        var t = {
                            min: this.data.min,
                            max: this.data.max,
                            step: this.data.step
                        };
                        this.input = r.add_ele('input', this.content, {
                            className: 'sliderVal',
                            type: 'number',
                            ...t
                        }), this.slider = r.add_ele('input', r.add_ele('div', this.content, {
                            className: 'slidecontainer',
                            style: {
                                'margin-top': '-8px'
                            }
                        }), {
                            className: 'sliderM',
                            type: 'range',
                            ...t
                        }), this.input.addEventListener('focus', (() => (this.input_focused = !0, this.interact()))), this.input.addEventListener('blur', (() => (this.input_focused = !1, this.interact()))), this.slider.addEventListener('input', (() => this.interact(this.value = this.slider.value))), this.input.addEventListener('input', (() => this.interact(this.value = +this.input.value)))
                    }
                    interact() {
                        var t = !this.input_focused && this.data.labels && this.data.labels[this.value] || this.value;
                        this.input.type = 'string' == typeof t ? 'text' : 'number', this.input.value = t, this.slider.value = this.value
                    }
                    update(t) {
                        super.update(t), this.interact()
                    }
                }, class extends a {
                    static id = 'color';
                    create() {
                        this.input = r.add_ele('input', this.content, {
                            name: 'color',
                            type: 'color',
                            style: {
                                float: 'right'
                            }
                        }), this.input.addEventListener('change', (() => this.value = this.input.value))
                    }
                    update(t) {
                        super.update(t), t && (this.input.value = this.value)
                    }
                }, n], t.exports = a
            },
            3651: (t, e, i) => {
                'use strict';
                var {
                    utils: r,
                    tick: s,
                    select: a
                } = i(8203), n = i(7846);
                class o {
                    constructor(t, e) {
                        this.node = r.crt_ele('div', {
                            className: 'menuItem'
                        }), this.icon = r.add_ele('div', this.node, {
                            className: 'menuItemIcon',
                            style: {
                                'background-image': 'url(' + JSON.stringify(e) + ')'
                            }
                        }), this.label = r.add_ele('div', this.node, {
                            className: 'menuItemTitle',
                            textContent: t
                        }), this.node.addEventListener('click', (() => this.emit('click'))), s(this.node), a(this.node), this.hide()
                    }
                    attach(t) {
                        t.append(this.node)
                    }
                    show() {
                        this.node.style.display = 'flex'
                    }
                    hide() {
                        this.node.style.display = 'none'
                    }
                }
                n.mixin(o.prototype), t.exports = o
            },
            6154: (t, e, i) => {
                'use strict';
                var {
                    utils: r
                } = i(8203), s = i(9969);
                t.exports = class {
                    constructor(t, e) {
                        this.tab = t, this.controls = new Set, e && (this.header = r.add_ele('div', this.tab.content, {
                            className: 'setHed'
                        }), this.header_status = r.add_ele('span', this.header, {
                            className: 'material-icons plusOrMinus'
                        }), r.add_ele('text', this.header, {
                            nodeValue: e
                        }), this.header.addEventListener('click', (() => this.toggle()))), this.content = r.add_ele('div', this.tab.content, {
                            className: 'setBodH'
                        }), e && this.expand()
                    }
                    toggle() {
                        this.collapsed ? this.expand() : this.collapse()
                    }
                    collapse() {
                        this.collapsed = !0, this.update()
                    }
                    expand() {
                        this.collapsed = !1, this.update()
                    }
                    update(t) {
                        this.content.style.display = this.collapsed ? 'none' : 'block', this.header && (this.header.style.display = 'block', this.header_status.textContent = 'keyboard_arrow_' + (this.collapsed ? 'right' : 'down'));
                        for (let e of this.controls) e.update(t)
                    }
                    show() {
                        this.expand(), this.header && (this.header.style.display = 'block')
                    }
                    hide() {
                        this.content.style.display = 'none', this.header && (this.header.style.display = 'none')
                    }
                    fix() {
                        this.update();
                        for (let t of this.controls) t.show_content()
                    }
                    control(t, e) {
                        for (let i of s.Types)
                            if (i.id == e.type) {
                                let r = new i(t, e, this);
                                return this.controls.add(r), r
                            } throw new TypeError('Unknown type: ' + e.type)
                    }
                }
            },
            6760: (t, e, i) => {
                'use strict';
                var {
                    utils: r,
                    tick: s,
                    select: a
                } = i(8203), n = i(6154);
                t.exports = class {
                    constructor(t, e) {
                        this.window = t, this.button = r.add_ele('div', this.window.tab_layout, {
                            className: 'settingTab',
                            textContent: e,
                            events: {
                                click: () => this.show()
                            }
                        }), s(this.button), a(this.button), this.categories = new Set, this.content = r.add_ele('div', t.container, {
                            id: 'settHolder'
                        }), this.hide()
                    }
                    category(t) {
                        var e = this.last_category = new n(this, t);
                        return this.categories.add(e), e
                    }
                    control(...t) {
                        var e = this.last_category;
                        return e && e.is_default || ((e = this.category()).is_default = !0), e.control(...t)
                    }
                    update(t) {
                        for (let e of this.categories) e.update(t)
                    }
                    show() {
                        this.visible = !0;
                        for (let t of this.window.tabs) t != this && t.hide();
                        this.button.classList.add('tabANew'), this.show_content(), this.window.menu.emit('tab-shown');
                        for (let t of this.categories) t.fix()
                    }
                    hide() {
                        this.visible = !1, this.button.classList.remove('tabANew'), this.hide_content()
                    }
                    show_content() {
                        this.content.style.display = 'block'
                    }
                    hide_content() {
                        this.content.style.display = 'none'
                    }
                }
            },
            2964: (t, e, i) => {
                'use strict';
                var {
                    utils: r
                } = i(8203), s = i(6760);
                t.exports = class {
                    constructor(t) {
                        this.menu = t, this.content = r.crt_ele('div', {
                            style: {
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                left: 0,
                                top: 0,
                                'z-index': 1e9
                            }
                        }), this.node = this.content.attachShadow({
                            mode: 'closed'
                        }), this.styles = new Set, new MutationObserver(((t, e) => {
                            for (let e of t)
                                for (let t of e.addedNodes)['LINK', 'STYLE'].includes(t.tagName) && this.update_styles()
                        })).observe(document, {
                            childList: !0,
                            subtree: !0
                        }), this.holder = r.add_ele('div', this.node, {
                            id: 'windowHolder',
                            className: 'popupWin',
                            style: {
                                'pointer-events': 'all'
                            }
                        }), this.container = r.add_ele('div', this.holder, {
                            id: 'menuWindow',
                            className: 'stickyHeader dark',
                            style: {
                                'overflow-y': 'auto',
                                width: '1200px',
                                'max-height': 'calc(100% - 250px)',
                                top: '50%',
                                transform: 'translate(-50%, -50%)'
                            }
                        }), this.header = r.add_ele('div', this.container, {
                            className: 'settingsHeader'
                        }), this.holder.addEventListener('click', (t => {
                            t.target == this.holder && this.hide()
                        })), this.tabs = new Set, this.tab_layout = r.add_ele('div', this.header, {
                            id: 'settingsTabLayout'
                        }), this.hide()
                    }
                    update_styles() {
                        for (let t of this.styles) t.remove(), this.styles.delete(t);
                        for (let t of document.styleSheets) {
                            let e = r.add_ele('style', this.node);
                            if (this.styles.add(e), t.href) e.textContent += '@import url(' + JSON.stringify(t.href) + ');\n';
                            else try {
                                for (let i of t.cssRules) e.textContent += i.cssText + '\n'
                            } catch (t) {
                                console.error(t)
                            }
                        }
                    }
                    tab(t) {
                        var e = new s(this, t);
                        return this.tabs.add(e), e
                    }
                    attach(t) {
                        t.appendChild(this.content)
                    }
                    show() {
                        this.content.style.display = 'block'
                    }
                    hide() {
                        this.content.style.display = 'none'
                    }
                    get main_tab() {
                        var t;
                        for (let e of this.tabs)
                            if (t = t || e, e.visible) return e;
                        return t
                    }
                    update(t) {
                        for (let e of this.tabs) e.update(t), e != this.main_tab && e.hide();
                        this.main_tab.show()
                    }
                }
            },
            9853: (t, e, i) => {
                'use strict';
                var r = i(2034),
                    {
                        utils: s,
                        consts: a
                    } = i(8203);
                t.exports = class extends r {
                    invite = /([a-z0-9-]{3,25})\s*?$/i;
                    async create(t) {
                        this.name = 'Discord Invite';
                        var e = (t = await t + '').match(this.invite);
                        if (!e || !e[1]) throw new Error('Invalid invite code: ' + t);
                        var i = e[1];
                        console.log('Discord code:', i), this.data = await (await fetch(`https://discord.com/api/v8/invites/${i}?with_counts=true`)).json(), this.content = s.crt_ele('div', {
                            style: {
                                'margin-bottom': '15px'
                            }
                        }), this.shadow = this.content.attachShadow({
                            mode: 'closed'
                        }), this.load(this.data, this.shadow), this.ready(), this.menu.window.header.prepend(this.content)
                    }
                    load(t, e) {
                        e.innerHTML = '\n<div class=\'content\'>\n\t<div class=\'icon\'></div>\n\t<div class=\'name\'></div>\n\t<div class=\'online status\'></div>\n\t<div class=\'total status\'></div>\n\t<a draggable=\'false\' class=\'join\'>Join</a>\n</div>', s.add_ele('style', e, {
                            textContent: i(6605)
                        });
                        var r = s.node_tree({
                            container: '^ > .content',
                            icon: '$ > .icon',
                            name: '$ > .name',
                            online: '$ > .online',
                            total: '$ > .total',
                            join: '$ > .join'
                        }, e);
                        10006 == t.code ? (r.container.classList.add('invalid'), r.name.textContent = 'Invalid Invite') : (t.guild.icon ? r.icon.style['background-image'] = 'url(' + JSON.stringify('https://cdn.discordapp.com/icons/' + t.guild.id + '/' + t.guild.icon + '?size=64') + ')' : r.icon.textContent = t.guild.name.split(' ').map((t => t[0])).join(''), r.container.classList.add('valid'), r.name.textContent = t.guild.name, r.online.textContent = t.approximate_presence_count, r.total.textContent = t.approximate_member_count, r.join.href = 'https://discord.com/invite/' + t.code)
                    }
                }
            },
            9133: (t, e, i) => {
                'use strict';
                var r = i(2034),
                    s = i(6425),
                    {
                        utils: a,
                        consts: n
                    } = i(8203);
                t.exports = class extends r {
                    async create(t) {
                        this.name = 'Krunker Settings', this.config = a.crt_ele('div', {
                            style: {
                                'text-align': 'right',
                                display: 'inline-block',
                                float: 'right'
                            }
                        }), a.add_ele('div', this.config, {
                            className: 'settingsBtn',
                            textContent: 'Reset',
                            events: {
                                click: () => this.menu.load_preset('Default')
                            }
                        }), a.add_ele('div', this.config, {
                            className: 'settingsBtn',
                            textContent: 'Export',
                            events: {
                                click: () => s.save({
                                    name: 'menu.json',
                                    data: JSON.stringify(this.menu.config)
                                })
                            }
                        }), a.add_ele('div', this.config, {
                            className: 'settingsBtn',
                            textContent: 'Import',
                            events: {
                                click: () => s.pick({
                                    accept: 'menu.json'
                                }).then((async t => {
                                    var e = await t.read();
                                    try {
                                        await this.menu.insert_config(JSON.parse(e), !0)
                                    } catch (t) {
                                        console.error(t), alert('Invalid config')
                                    }
                                }))
                            }
                        }), this.preset = a.add_ele('select', this.config, {
                            id: 'settingsPreset',
                            className: 'inputGrey2',
                            style: {
                                'margin-left': '0px',
                                'font-size': '14px'
                            },
                            events: {
                                change: () => {
                                    'Custom' != this.preset.value && this.menu.load_preset(this.preset.value)
                                }
                            }
                        }), a.add_ele('option', this.preset, {
                            value: 'Custom',
                            textContent: 'Custom'
                        }), this.search = a.crt_ele('input', {
                            id: 'settSearch',
                            type: 'text',
                            placeholder: 'Search',
                            style: {
                                display: 'inline-block',
                                width: '220px'
                            },
                            events: {
                                input: () => {
                                    if (!this.search.value) return [...this.menu.window.tabs][0].show();
                                    for (let t of this.menu.window.tabs) {
                                        t.hide();
                                        for (let e of t.categories) {
                                            e.hide();
                                            for (let i of e.controls) i.hide_content(), i.name.toLowerCase().includes(this.search.value.toLowerCase()) && (i.show_content(), t.show_content(), e.show())
                                        }
                                    }
                                }
                            }
                        }), this.menu.on('preset', (t => a.add_ele('option', this.preset, {
                            value: t,
                            textContent: t
                        }))), this.menu.on('config', (() => this.handle_config())), this.menu.on('control', (t => t.on('change', ((t, e) => {
                            e || this.handle_config()
                        })))), this.menu.on('tab-shown', (() => this.search.value = '')), this.menu.window.header.prepend(this.config), this.menu.window.header.prepend(this.search), this.ready()
                    }
                    handle_config() {
                        var t = JSON.stringify(this.menu.config);
                        for (let [e, i] of this.menu.presets)
                            if (JSON.stringify(a.assign_deep(a.clone_obj(this.menu.presets.get('Default')), i)) == t) return this.preset.value = e;
                        this.preset.value = 'Custom'
                    }
                }
            },
            8203: (t, e, i) => {
                'use strict';
                var r = new(i(3619));
                e.utils = r, e.tick = t => t.addEventListener('mouseenter', (() => {
                    try {
                        playTick()
                    } catch (t) {}
                })), e.select = t => t.addEventListener('click', (() => {
                    try {
                        SOUND.play('select_0', .1)
                    } catch (t) {}
                }))
            },
            4447: (t, e, i) => {
                'use strict';
                var {
                    utils: r,
                    store: s
                } = i(8203), a = i(2311), n = i(2964), o = i(3651), h = i(7846);
                class c {
                    constructor(t, e, i, r = new a) {
                        this.store = r, this.config_key = i, new MutationObserver(((t, e) => {
                            for (let e of t)
                                for (let t of e.addedNodes) 'menuItemContainer' == t.id ? this.button.attach(t) : 'uiBase' == t.id && this.window.attach(t)
                        })).observe(document, {
                            childList: !0,
                            subtree: !0
                        }), this.presets = new Map, this.presets.set('Default', {}), this.config = {}, this.addons = new Set, this.window = new n(this), this.button = new o(t, e), this.button.on('click', (() => {
                            this.window.show()
                        })), this.button.hide()
                    }
                    load_style(t) {
                        r.add_ele('style', this.window.node, {
                            textContent: t
                        })
                    }
                    load_addon(t, ...e) {
                        try {
                            var i = new t(this, e);
                            this.addons.add(i)
                        } catch (e) {
                            console.error('Error loading addon:', t, '\n', e)
                        }
                    }
                    add_preset(t, e) {
                        this.presets.set(t, e), this.emit('preset', t, e)
                    }
                    async insert_config(t, e = !1) {
                        this.config = r.assign_deep(r.clone_obj(this.presets.get('Default')), t), e && await this.save_config(), this.window.update(!0), this.emit('config')
                    }
                    async load_preset(t) {
                        if (!this.presets.has(t)) throw new Error('Invalid preset:', t);
                        this.insert_config(this.presets.get(t), !0)
                    }
                    async save_config() {
                        await this.store.set(this.config_key, this.config)
                    }
                    async load_config() {
                        this.insert_config(await this.store.get(this.config_key, 'object'))
                    }
                    static keybinds = new Set
                }
                h.mixin(c.prototype), window.addEventListener('keydown', (t => {
                    if (!t.repeat && !['TEXTAREA', 'INPUT'].includes((document.activeElement || {}).tagName))
                        for (let e of c.keybinds) e.code.includes(t.code) && (t.preventDefault(), e.interact())
                })), t.exports = c
            },
            4304: (t, e, i) => {
                'use strict';
                var {
                    Vector3: r,
                    Hex3: s,
                    Box3: a
                } = i(4914), {
                    loader: n
                } = i(9606), {
                    vars: o,
                    gconsts: h
                } = n, c = 0;
                setInterval((() => c = Math.random()), 2e3);
                t.exports = class {
                    part_keys = ['head', 'torso', 'legs'];
                    calc_ticks = 2;
                    constructor(t, e) {
                        this.data = t, this.entity = 'object' == typeof e && null != e ? e : {}, this.velocity = new r, this.position = new r, this.esp_hex = new s, this.hp_hex = new s, this.dont_calc = 0, this.hitbox = new a, this.hitbox.head = new a, this.parts = {
                            hitbox_head: new r,
                            head: new r,
                            torso: new r,
                            legs: new r
                        }
                    }
                    get ground() {
                        return this.entity.onGround
                    }
                    calc_rect() {
                        var t = (2 * h.armScale + h.chestWidth + h.armInset) / 2,
                            e = 1 / 0,
                            i = -1 / 0,
                            r = 1 / 0,
                            s = -1 / 0,
                            a = null;
                        this.frustum = !0;
                        for (let n = -1; this.frustum && n < 2; n += 2)
                            for (let o = -1; this.frustum && o < 2; o += 2)
                                for (let h = 0; this.frustum && h < 2; h++)
                                    if (a = this.obj.position.clone()) {
                                        if (a.x += n * t, a.z += o * t, a.y += h * this.height, !this.data.utils.contains_point(a)) return this.frustum = !1;
                                        a.project(this.data.world.camera), e = Math.min(e, a.x), i = Math.max(i, a.x), r = Math.min(r, a.y), s = Math.max(s, a.y)
                                    } e = (e + 1) / 2, i = (i + 1) / 2, r = .5 - ((r = (r + 1) / 2) - .5), s = .5 - ((s = (s + 1) / 2) - .5), e *= this.data.ctx.canvas.width, i *= this.data.ctx.canvas.width, r *= this.data.ctx.canvas.height;
                        var n = {
                            left: e,
                            top: s *= this.data.ctx.canvas.height,
                            right: i,
                            bottom: r,
                            width: i - e,
                            height: r - s
                        };
                        return n.x = n.left + n.width / 2, n.y = n.top + n.height / 2, n
                    }
                    scale_rect(t, e) {
                        var i = {},
                            r = ['y', 'height', 'top', 'bottom'];
                        for (var s in this.rect) i[s] = this.rect[s] / (r.includes(s) ? e : t);
                        return i
                    }
                    calc_in_fov() {
                        if (!this.active) return !1;
                        if (110 == this.data.aim_fov) return !0;
                        if (!this.frustum) return !1;
                        var t = this.data.world.camera.fov;
                        this.data.world.camera.fov = this.data.aim_fov / t * 100, this.data.world.camera.updateProjectionMatrix(), this.data.utils.update_frustum();
                        var e = this.data.utils.contains_point(this.aim_point);
                        return this.data.world.camera.fov = t, this.data.world.camera.updateProjectionMatrix(), this.data.utils.update_frustum(), e
                    }
                    get ping() {
                        return this.entity.ping
                    }
                    get jump_bob_y() {
                        return this.entity.jumpBobY
                    }
                    get clan() {
                        return this.entity.clan
                    }
                    get alias() {
                        return this.entity.alias
                    }
                    get weapon() {
                        return this.entity.weapon
                    }
                    get weapon_auto() {
                        return !this.weapon.nAuto
                    }
                    get can_slide() {
                        return this.entity.canSlide
                    }
                    get risk() {
                        return this.entity.level >= 30 || this.entity.account && (this.entity.account.featured || this.entity.account.premiumT)
                    }
                    get is_you() {
                        return this.entity[o.isYou]
                    }
                    get target() {
                        return this.data.target && this.entity == this.data.target.entity
                    }
                    get can_melee() {
                        return this.weapon.melee && this.data.target && this.data.target.active && this.position.distance_to(this.data.target) <= 18 || !1
                    }
                    get reloading() {
                        return 0 != this.entity.reloadTimer
                    }
                    get can_aim() {
                        return !this.can_melee
                    }
                    get can_throw() {
                        return this.entity.canThrow && this.weapon.canThrow
                    }
                    get aimed() {
                        var t = this.can_throw ? 1 - this.entity.chargeTime / this.entity.throwCharge : this.weapon.melee ? 1 : this.entity[o.aimVal];
                        return this.weapon.noAim || 0 == t || this.can_melee || !1
                    }
                    get can_shoot() {
                        return !this.reloading && this.has_ammo && (this.can_throw || !this.weapon.melee || this.can_melee)
                    }
                    get hitbox_pad() {
                        return this.data.game.config.hitBoxPad - .2
                    }
                    get hitbox_scale() {
                        return this.entity.scale + this.hitbox_pad - .2
                    }
                    get aim_press() {
                        return this.data.controls[o.adsToggled] || this.data.controls.keys[this.data.controls.binds.aim.val]
                    }
                    get crouch() {
                        return this.entity[o.crouchVal] || 0
                    }
                    get box_scale() {
                        this.data.utils.camera_world();
                        var t = t => Math.min(1, this.rect[t] / this.data.ctx.canvas[t] * 10);
                        return [t('width'), t('height')]
                    }
                    get dist_scale() {
                        var t = this.data.utils.camera_world(),
                            e = Math.max(.65, 1 - this.data.utils.getD3D(t.x, t.y, t.z, this.position.x, this.position.y, this.position.z) / 600);
                        return [e, e]
                    }
                    get distance_camera() {
                        return this.data.utils.camera_world().distanceTo(this.position)
                    }
                    get obj() {
                        return this.is_ai ? this.enity.dat : this.entity[o.objInstances]
                    }
                    get land_bob_y() {
                        return this.entity.landBobY || 0
                    }
                    get recoil_y() {
                        return this.entity[o.recoilAnimY] || 0
                    }
                    get has_ammo() {
                        return this.ammo || this.ammo == this.max_ammo
                    }
                    get ammo() {
                        return this.entity[o.ammos][this.entity[o.weaponIndex]] || 0
                    }
                    get max_ammo() {
                        return this.weapon.ammo || 0
                    }
                    get height() {
                        return this.entity.height - this.crouch * h.crouchDst
                    }
                    get health() {
                        return this.entity.health || 0
                    }
                    get scale() {
                        return this.entity.scale
                    }
                    get max_health() {
                        return this.entity[o.maxHealth] || 100
                    }
                    get active() {
                        return this.entity.active && null != this.entity.x && this.health > 0 && (!!this.is_you || this.chest && this.leg) && !0
                    }
                    get teammate() {
                        return this.is_you || this.data.player && this.team && this.team == this.data.player.team
                    }
                    get enemy() {
                        return !this.teammate
                    }
                    get team() {
                        return this.entity.team
                    }
                    get streaks() {
                        return Object.keys(this.entity.streaks || {})
                    }
                    get did_shoot() {
                        return this.entity[o.didShoot]
                    }
                    get chest() {
                        return this.entity.lowerBody ? this.entity.lowerBody.children[0] : null
                    }
                    get leg() {
                        for (var t of this.entity.legMeshes)
                            if (t.visible) return t;
                        return this.chest
                    }
                    calc_rot() {
                        var t = this.data.utils.camera_world(),
                            e = this.aim_point;
                        return {
                            x: this.data.utils.getXDire(t.x, t.y, t.z, e.x, e.y - this.data.player.jump_bob_y, e.z) || 0,
                            y: this.data.utils.getDir(t.z, t.x, e.z, e.x) || 0
                        }
                    }
                    calc_parts() {
                        if (!this.active || this.is_you) return this.can_target = !1;
                        if (!this.data.aim_smooth || !this.aim_point || this.dont_calc++ % (this.calc_ticks + 1) == 0) {
                            var t = (new this.data.three.Box3).setFromObject(this.chest),
                                e = t.getSize(),
                                i = t.getCenter();
                            this.parts.torso.copy(i).translate_quaternion(this.chest.getWorldQuaternion(), (new r).copy({
                                x: 0,
                                y: -.75,
                                z: 0
                            })), this.parts.torso_height = e.y - 1.5, this.parts.head.copy(i).translate_quaternion(this.chest.getWorldQuaternion(), (new r).copy({
                                x: 0,
                                y: this.parts.torso_height / 2,
                                z: 0
                            }));
                            var s = this.leg[o.getWorldPosition](),
                                a = this.leg.getWorldScale();
                            this.parts.legs.copy(s).translate_quaternion(this.leg.getWorldQuaternion(), (new r).copy({
                                x: -a.x / 2,
                                y: -a.y / 2,
                                z: 0
                            }));
                            var n = 'random' == this.data.aim_offset ? this.part_keys[~~(c * this.part_keys.length)] : this.data.aim_offset;
                            switch (n) {
                                case 'head':
                                    this.set_aim_point(this.parts.head);
                                    break;
                                case 'multi':
                                    if (!this.set_aim_point(this.parts.hitbox_head)) {
                                        let t = this.data.utils.camera_world(),
                                            e = this.visible_points(this.hitbox.head.points()).sort(((e, i) => e.distance_to(t) - i.distance_to(t) + (i.y - e.y)));
                                        for (let t of e)
                                            if (this.set_aim_point(t)) break
                                    }
                                    break;
                                default:
                                    this.set_aim_point(this.parts[n])
                            }
                            this.in_fov = this.calc_in_fov(), this.can_target = this.active && this.can_see && this.enemy && this.in_fov
                        }
                    }
                    visible_points(t) {
                        var e = [];
                        for (let i of [
                                [0, 3],
                                [3, 5],
                                [5, 6],
                                [6, 0]
                            ]) {
                            let r = new this.data.three.Box3;
                            for (let e of i) r.expandByPoint(t[e]);
                            let s = r.getSize(),
                                a = r.getCenter();
                            e.push({
                                width: s.x,
                                length: s.z,
                                height: s.y,
                                x: a.x,
                                y: a.y - s.y / 2,
                                z: a.z
                            })
                        }
                        return t.filter((t => !!this.point_obstructing(t, e)))
                    }
                    point_obstructing(t, e) {
                        var i = this.data.utils.camera_world(),
                            r = this.data.utils.getD3D(i.x, i.y, i.z, t.x, t.y, t.z),
                            s = this.data.utils.getDir(i.z, i.x, t.z, t.x),
                            a = this.data.utils.getDir(this.data.utils.getDistance(i.x, i.z, t.x, t.z), t.y, 0, i.y),
                            n = 1 / (r * Math.sin(s - Math.PI) * Math.cos(a)),
                            o = 1 / (r * Math.cos(s - Math.PI) * Math.cos(a)),
                            h = 1 / (r * Math.sin(a));
                        for (let t of e) {
                            var c = this.data.utils.lineInRect(i.x, i.z, i.y, n, o, h, t.x - Math.max(0, t.width), t.z - Math.max(0, t.length), t.y - Math.max(0, t.height), t.x + Math.max(0, t.width), t.z + Math.max(0, t.length), t.y + Math.max(0, t.height));
                            if (c && 1 > c) return c
                        }
                    }
                    set_aim_point(t) {
                        return this.aim_point = t, this.can_see = null == this.data.utils.obstructing(t)
                    }
                    tick() {
                        if (this.position.set(this.entity.x, this.entity.y, this.entity.z), this.velocity.set(this.entity.velocity.x, this.entity.velocity.y, this.entity.velocity.z), this.hitbox.min.set(this.position.x - this.hitbox_scale, this.position.y, this.position.z - this.hitbox_scale), this.hitbox.max.set(this.position.x + this.hitbox_scale, this.position.y + this.height + this.hitbox_pad, this.position.z + this.hitbox_scale), this.hitbox.head.max.copy(this.hitbox.max), this.hitbox.head.min.copy(this.hitbox.min), this.hitbox.head.min.y = this.hitbox.max.y - this.entity.headScale - .5, this.parts.hitbox_head.copy(this.position).y = this.position.y + this.height, !this.is_you) {
                            this.rect = this.calc_rect(), this.esp_hex.set_style(this.data.rainbow ? this.data.visual.rainbow.col : this.data.color[this.enemy ? this.risk ? 'risk' : 'hostile' : 'friendly']), this.can_see || this.esp_hex.sub_scalar(119), this.esp_color = this.esp_hex.toString();
                            var t = this.health / this.max_health * 100,
                                e = t < 50 ? 255 : Math.round(510 - 5.1 * t),
                                i = t < 50 ? Math.round(5.1 * t) : 255;
                            this.hp_hex.set(e, i, 0), this.hp_color = this.hp_hex.toString()
                        }
                    }
                }
            },
            3137: () => {
                'use strict';
                var t = new Function('return this')(),
                    e = {
                        port: 443,
                        localhost: ['localhost', '127.0.0.1'],
                        hosts: {
                            http: ['krunker.io', 'internal.krunker.io'],
                            mm: ['matchmaker.krunker.io', 'matchmaker_beta.krunker.io', '127.0.0.1:5050'],
                            api: ['api.krunker.io', 'api_beta.krunker.io', '127.0.0.1:5080'],
                            social: ['social.krunker.io', 'social_beta.krunker.io', '127.0.0.1:5070'],
                            editor: ['editor.krunker.io', 'editor_beta.krunker.io', '127.0.0.1:5090'],
                            assets: ['assets.krunker.io'],
                            userAssets: ['user-assets.krunker.io']
                        },
                        region: {
                            default: 'de-fra',
                            map: {
                                fra: 'de-fra',
                                sv: 'us-ca-sv',
                                syd: 'au-syd',
                                tok: 'jb-hnd',
                                mia: 'us-fl',
                                sin: 'sgp',
                                ny: 'us-nj'
                            },
                            reverseMap: {
                                'de-fra': 'fra',
                                'us-ca-sv': 'sv',
                                'au-syd': 'syd',
                                'jb-hnd': 'tok',
                                'us-fl': 'mia',
                                sgp: 'sin',
                                'us-nj': 'ny'
                            }
                        },
                        isSSL: !0,
                        protocol: {
                            http: 'https:',
                            ws: 'wss:'
                        }
                    };
                const i = e.localhost.includes(location.hostname),
                    r = !i && location.hostname.split('.').slice(-2).join('.') == location.hostname,
                    s = function(t) {
                        if (e.hosts.mm.includes(t.host)) {
                            if (t.protocol = e.protocol.http, t.hostname = location.hostname, t.port = e.port, t.pathname = `/mm${t.pathname}`, t.search = t.search.replace(`hostname=${location.hostname}`, `hostname=${e.hosts.http[0]}`), t.search.match(/region=/))
                                if (i) t.search = t.search.replace('region=local', `region=${e.region.default}`);
                                else if (!r) {
                                const i = e.region.map[location.hostname.split('.')[0]] || e.region.default;
                                t.search = t.search.replace(/region=[\w-]+/g, `region=${i}`)
                            }
                        } else e.hosts.api.includes(t.host) && (t.protocol = e.protocol.http, t.hostname = location.hostname, t.port = e.port, t.pathname = `/api${t.pathname}`);
                        return t
                    },
                    a = t.fetch;
                t.fetch = async function(...t) {
                    try {
                        const e = new URL(t[0]);
                        t[0] = s(e).toString()
                    } catch (t) {}
                    return a(...t)
                }, t.WebSocket = class extends t.WebSocket {
                    constructor(...t) {
                        const i = new URL(t[0]);
                        e.hosts.social.includes(i.host) ? (i.protocol = e.protocol.ws, i.port = '', i.host = e.hosts.social[0]) : e.hosts.editor.includes(i.host) && (i.protocol = e.protocol.ws, i.port = '', i.host = e.hosts.editor[0]), t[0] = `${e.protocol.ws}//${location.host}/ws?redirect=${btoa(i.toString())}`, super(t)
                    }
                }, t.XMLHttpRequest = class extends t.XMLHttpRequest {
                    open(...t) {
                        try {
                            const i = new URL(t[1]);
                            e.hosts.assets.includes(i.host) ? (i.protocol = e.protocol.http, i.hostname = location.hostname, i.port = e.port, i.pathname = `/assets${i.pathname}`, t[1] = i.toString()) : e.hosts.userAssets.includes(i.host) ? (i.protocol = e.protocol.http, i.hostname = location.hostname, i.port = e.port, i.pathname = `/user${i.pathname}`, t[1] = i.toString()) : t[1] = s(i).toString()
                        } catch (t) {}
                        super.open(...t)
                    }
                }, document.createElementNS = new Proxy(document.createElementNS, {
                    apply: function(t, i, r) {
                        const s = t.apply(i, r);
                        let a;
                        s.addEventListener('error', (function t() {
                            this.removeEventListener('error', t, !1), this.addEventListener('error', a, !1);
                            const i = new URL(this.src);
                            e.hosts.assets.includes(i.host) && (i.protocol = e.protocol.http, i.hostname = location.hostname, i.port = e.port, i.pathname = `/assets${i.pathname}`), this.src = i.toString()
                        }), !1);
                        const n = s.addEventListener;
                        return s.addEventListener = new Proxy(n, {
                            apply: function(t, e, i) {
                                'error' == i[0] ? (a = i[1], s.addEventListener = n) : t.apply(e, i)
                            }
                        }), s
                    }
                });
                const n = document.createElement('div');
                n.className = 'settingsBtn', n.style.cssText = 'width: auto;font-size: 14px;padding: 5px 8px;', n.innerText = 'Find', n.addEventListener('click', (function() {
                    const t = document.getElementById('setBod_local').childNodes[0].childNodes[2].value,
                        r = e.region.reverseMap[t] || e.region.reverseMap[e.region.default];
                    if (i) {
                        const t = `${e.protocol.http}//${r}.subdomain.com`;
                        alert(`REDIRECT - ${t}`)
                    } else {
                        const t = `${e.protocol.http}//${r}.${location.hostname.split('.').slice(-2).join('.')}`;
                        location.href = t
                    }
                }), !1);
                const o = setInterval((function() {
                    t.windows && (clearInterval(o), t.windows[0].getSettings && (t.windows[0].getSettings = new Proxy(t.windows[0].getSettings, {
                        apply: function(t, i, r) {
                            return setTimeout((function() {
                                const t = document.getElementById('setBod_local');
                                if (t) {
                                    const i = t.children[0];
                                    i.innerHTML = i.innerHTML.replace('Default Region', 'Proxy Region');
                                    const r = i.children[0];
                                    i.insertBefore(n, r), [...r.children].filter((t => !e.region.reverseMap[t.value])).forEach((t => r.removeChild(t))), r.onchange()
                                }
                            })), t.apply(i, r)
                        }
                    })))
                }), 100)
            },
            8144: t => {
                'use strict';
                var e = t => 'object' == typeof t && null != t,
                    i = t => 'string' == typeof t || t instanceof Location || t instanceof URL,
                    r = t => {
                        if (e(t)) {
                            if (t instanceof Headers) {
                                let e = {};
                                for (let [i, r] of t) e[i] = r;
                                return e
                            }
                            return t
                        }
                        return {}
                    },
                    s = t => {
                        if (!e(t)) throw new TypeError('Input must be an object');
                        var i = {
                                cache: 'no-cache',
                                headers: r(t.headers)
                            },
                            a = s.resolve(t);
                        switch (t.cache) {
                            case !0:
                                i.cache = 'force-cache';
                                break;
                            case 'query':
                                a.search += '?' + Date.now()
                        }
                        1 == t.cache && (i.cache = 'force-cache'), e(t.data) && (i.method = 'POST', i.body = JSON.stringify(t.data), i.headers['content-type'] = 'application/json'), 'string' == typeof t.method && (i.method = t.method), t.sync && (i.xhr = !0, i.synchronous = !0);
                        var n = ['text', 'json', 'arrayBuffer'].includes(t.result) ? t.result : 'text';
                        return (i.xhr ? s.fetch_xhr : window.fetch.bind(window))(a, i).then((t => t[n]()))
                    };
                s.fetch_xhr = (t, e = {}) => {
                    if (!i(t)) throw new TypeError('url param is not resolvable');
                    t = new URL(t, location).href;
                    var r = 'string' == typeof e.method ? e.method : 'GET',
                        s = new XMLHttpRequest;
                    return s.open(r, t, !e.synchronous), new Promise(((t, i) => {
                        s.addEventListener('load', (() => t({
                            text: async () => s.responseText,
                            json: async () => JSON.parse(s.responseText),
                            headers: new Headers
                        }))), s.addEventListener('error', (t => i(t.error))), s.send(e.body)
                    }))
                }, s.resolve = t => {
                    if (!i(t.target)) throw new TypeError('Target must be specified');
                    var e = new URL(t.target);
                    return i(t.endpoint) && (e = new URL(t.endpoint, e)), 'object' == typeof t.query && null != t.query && (e.search = '?' + new URLSearchParams(Object.entries(t.query))), e
                }, t.exports = s
            },
            82: (t, e, i) => {
                'use strict';
                var r = i(3229);
                Symbol();
                t.exports = t => {
                    var e, i, s = {
                        sgp: 'sin',
                        'au-syd': 'syd',
                        'de-fra': 'fra',
                        'jb-hnd': 'tok',
                        'us-ca-sv': 'sv',
                        'us-fl': 'mia',
                        'us-nj': 'ny'
                    };
                    class a extends WebSocket {
                        constructor(a, n) {
                            t.proxy && (a = 'wss://' + (s[localStorage.kro_setngss_defaultRegion] || 'mia') + '.browserfps.com/ws?redirect=' + btoa(a)), super(a, n), this.addEventListener('message', (s => {
                                var a, [n, ...o] = r.decode(new Uint8Array(s.data));
                                if ('io-init' == n) e = o[0];
                                else if (t.unlock_skins && 0 == n && i && e && -1 != (a = o[0].indexOf(e))) {
                                    o[0][a + 12] = i[2], o[0][a + 13] = i[3], o[0][a + 14] = i[4], o[0][a + 19] = i[9], o[0][a + 24] = i[14], o[0][a + 33] = i[17];
                                    var h = r.encode([n, ...o]),
                                        c = new Uint8Array(h.byteLength + 2);
                                    c.set(h, 0), c.set(s.data.slice(-2), h.byteLength), Object.defineProperty(s, 'data', {
                                        value: c.buffer
                                    })
                                }
                            }))
                        }
                        set onmessage(t) {
                            return this.addEventListener('message', (e => {
                                try {
                                    return t.call(this, e)
                                } catch (t) {
                                    console.error('Socket error:', t)
                                }
                            })), t
                        }
                        send(t) {
                            var [e, ...s] = r.decode(t.slice(0, -2));
                            'en' == e && (i = s[0]), super.send(t)
                        }
                    }
                    return a
                }
            },
            4914: (t, e) => {
                'use strict';
                class i {
                    constructor(t = 0, e = 0, i = 0) {
                        this.x = t, this.y = e, this.z = i
                    }
                    clone() {
                        return new i(this.x, this.y, this.z)
                    }
                    mps() {
                        return 1e3 * Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
                    }
                    set(t, e, i) {
                        return this.x = t, this.y = e, this.z = i, this
                    }
                    copy(t) {
                        return this.x = t.x, this.y = t.y, this.z = t.z, this
                    }
                    add(t) {
                        return this.x += t.x, this.y += t.y, this.z += t.z, this
                    }
                    add_vectors(t = 0, e = 0, i = 0) {
                        return this.x += t, this.y += e, this.z += i, this
                    }
                    add_scalar(t) {
                        return this.x += t, this.y += t, this.z += t, this
                    }
                    sub(t) {
                        return this.x += t.x, this.y += t.y, this.z += t.z, this
                    }
                    sub_vectors(t = 0, e = 0, i = 0) {
                        return this.x -= t, this.y -= e, this.z -= i, this
                    }
                    sub_scalar(t) {
                        return this.x -= t, this.y -= t, this.z -= t, this
                    }
                    multiply(t) {
                        return this.x *= t.x, this.y *= t.y, this.z *= t.z, this
                    }
                    multiply_vectors(t = 0, e = 0, i = 0) {
                        return this.x *= t, this.y *= e, this.z *= i, this
                    }
                    multiply_scalar(t) {
                        return this.x *= t, this.y *= t, this.z *= t, this
                    }
                    divide(t) {
                        return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
                    }
                    divide_vectors(t = 0, e = 0, i = 0) {
                        return this.x /= t, this.y /= e, this.z /= i, this
                    }
                    divide_scalar(t) {
                        return this.x /= t, this.y /= t, this.z /= t, this
                    }
                    apply_quaternion(t) {
                        const e = this.x,
                            i = this.y,
                            r = this.z,
                            s = t.x,
                            a = t.y,
                            n = t.z,
                            o = t.w,
                            h = o * e + a * r - n * i,
                            c = o * i + n * e - s * r,
                            l = o * r + s * i - a * e,
                            d = -s * e - a * i - n * r;
                        return this.x = h * o + d * -s + c * -n - l * -a, this.y = c * o + d * -a + l * -s - h * -n, this.z = l * o + d * -n + h * -a - c * -s, this
                    }
                    translate_quaternion(t, e) {
                        for (var r in e) {
                            var s = new i;
                            s[r] = 1;
                            var a = s.apply_quaternion(t).multiply_scalar(e[r]);
                            this.add(a)
                        }
                        return this
                    }
                    distance_to(t) {
                        return Math.hypot(this.x - t.x, this.y - t.y, this.z - t.z)
                    }
                }
                i.Blank = new i;
                e.Box3 = class {
                    min = new i;
                    max = new i;
                    points() {
                        return [new i(this.min.x, this.min.y, this.min.z), new i(this.min.x, this.min.y, this.max.z), new i(this.min.x, this.max.y, this.min.z), new i(this.min.x, this.max.y, this.max.z), new i(this.max.x, this.min.y, this.min.z), new i(this.max.x, this.min.y, this.max.z), new i(this.max.x, this.max.y, this.min.z), new i(this.max.x, this.max.y, this.max.z)]
                    }
                }, e.Hex3 = class {
                    hex = [0, 0, 0];
                    constructor(t = '#000') {
                        this.set_style(t)
                    }
                    add_scalar(t) {
                        for (let e in this.hex) this.hex[e] += t;
                        return this.normalize()
                    }
                    sub_scalar(t) {
                        for (let e in this.hex) this.hex[e] -= t;
                        return this.normalize()
                    }
                    normalize() {
                        for (let t in this.hex) this.hex[t] = Math.max(Math.min(this.hex[t], 255), 0);
                        return this
                    }
                    set(t, e, i) {
                        return this.hex[0] = t, this.hex[1] = e, this.hex[2] = i, this
                    }
                    set_style(t) {
                        let e = 0,
                            i = '#' == t[0] ? 1 : 0,
                            r = t.length - i < 5 ? 1 : 2;
                        for (let s = i; s < t.length; s += r) {
                            let i = t.substr(s, r);
                            1 == r && (i += i), this.hex[e++] = parseInt(i, 16)
                        }
                        return this
                    }
                    toString() {
                        var t = '#';
                        for (let e of this.hex) t += e.toString(16).padStart(2, 0);
                        return t
                    }
                }, e.Vector3 = i
            },
            7263: t => {
                'use strict';
                t.exports = class {
                    is_host(t, ...e) {
                        return e.some((e => t.hostname == e || t.hostname.endsWith('.' + e)))
                    }
                    round(t, e) {
                        return Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
                    }
                    add_ele(t, e, i = {}) {
                        var r = this.crt_ele(t, i);
                        if ('function' == typeof e) this.wait_for(e).then((t => t.append(r)));
                        else {
                            if ('object' != typeof e || null == e || !e.append) throw new Error('Parent is not resolvable to a DOM element');
                            e.append(r)
                        }
                        return r
                    }
                    crt_ele(t, e = {}) {
                        var i, r = {};
                        for (let t in e) 'object' == typeof e[t] && null != e[t] && (r[t] = e[t], delete e[t]);
                        i = 'raw' == t ? this.crt_ele('div', {
                            innerHTML: e.html
                        }).firstChild : 'text' == t ? document.createTextNode('') : document.createElement(t);
                        var s = e.className;
                        s && (delete e.className, i.setAttribute('class', s));
                        var a = r.events;
                        if (a) {
                            delete r.events;
                            for (let t in a) i.addEventListener(t, a[t])
                        }
                        Object.assign(i, e);
                        for (let t in r) Object.assign(i[t], r[t]);
                        return i
                    }
                    wait_for(t, e) {
                        return new Promise((i => {
                            var r, s = () => {
                                try {
                                    var e = t();
                                    if (e) return r && clearInterval(r), i(e), !0
                                } catch (t) {
                                    console.log(t)
                                }
                            };
                            r = s() || setInterval(s, e || 50)
                        }))
                    }
                    sanitize(t) {
                        var e = document.createElement('div');
                        return e.textContent = t, e.innerHTML
                    }
                    unsanitize(t) {
                        var e = document.createElement('div');
                        return e.innerHTML = t, e.textContent
                    }
                    node_tree(t, e = document) {
                        var i = {
                                parent: e
                            },
                            r = /^\$\s+>?/g,
                            s = /^\^\s+>?/g;
                        for (var a in t) {
                            var n = t[a];
                            if (n instanceof Node) i[a] = n;
                            else if ('object' == typeof n) i[a] = this.node_tree(n, i.container);
                            else if (r.test(t[a])) {
                                if (!i.container) {
                                    console.warn('No container is available, could not access', n);
                                    continue
                                }
                                i[a] = i.container.querySelector(t[a].replace(r, ''))
                            } else if (s.test(t[a])) {
                                if (!i.parent) {
                                    console.warn('No parent is available, could not access', n);
                                    continue
                                }
                                i[a] = i.parent.querySelector(t[a].replace(s, ''))
                            } else i[a] = e.querySelector(t[a]);
                            i[a] || console.warn('No node found, could not access', n)
                        }
                        return i
                    }
                    string_key(t) {
                        return t.replace(/^([A-Z][a-z]+?)([A-Z0-9][a-z]*?)/, ((t, e, i) => ['Digit', 'Key'].includes(e) ? i : `${i} ${e}`))
                    }
                    clone_obj(t) {
                        return JSON.parse(JSON.stringify(t))
                    }
                    assign_deep(t, ...e) {
                        for (let i in e)
                            for (let r in e[i]) 'object' == typeof e[i][r] && null != e[i][r] && r in t ? this.assign_deep(t[r], e[i][r]) : 'object' == typeof t && null != t && Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e[i], r));
                        return t
                    }
                    filter_deep(t, e) {
                        for (let i in t) i in e || delete t[i], 'object' == typeof e[i] && null != e[i] && this.filter_deep(t[i], e[i]);
                        return t
                    }
                    redirect(t, e, i) {
                        var r = Symbol();
                        i.addEventListener(t, (t => {
                            t[r]
                        })), e.addEventListener(t, (e => i.dispatchEvent(Object.assign(new e.constructor(t, e), {
                            [r]: !0,
                            stopImmediatePropagation: e.stopImmediatePropagation.bind(e),
                            preventDefault: e.preventDefault.bind(e)
                        }))))
                    }
                    promise() {
                        var t, e = new Promise(((e, i) => t = {
                            resolve: e,
                            reject: i
                        }));
                        return Object.assign(e, t), e.resolve_in = (t = 0, i) => setTimeout((() => e.resolve(i)), t), e
                    }
                    rtn(t, e) {
                        return (t / e).toFixed() * e
                    }
                }
            },
            9606: (t, e, i) => {
                'use strict';
                var r = i(2311),
                    s = i(6947),
                    a = i(1191);
                e.store = new r, e.meta = {
                    github: 'https://github.com/y9x/',
                    discord: 'https://discord.gg/BMKZUnRE',
                    forum: 'https://forum.sys32.dev/'
                };
                var n = new s;
                e.loader = n;
                var o = new(i(7263));
                if (e.is_frame = window != window.top, e.krunker = o.is_host(location, 'krunker.io', 'browserfps.com') && 'browserfps.com' != location.host && ['/.htaccess', '/'].includes(location.pathname), e.proxy_addons = [{
                        name: 'Browser VPN',
                        chrome: 'https://chrome.google.com/webstore/detail/ppajinakbfocjfnijggfndbdmjggcmde',
                        firefox: 'https://addons.mozilla.org/en-US/firefox/addon/mybrowser-vpn/'
                    }, {
                        name: 'Hola VPN',
                        chrome: 'https://chrome.google.com/webstore/detail/gkojfkhlekighikafcpjkiklfbnlmeio',
                        firefox: 'https://addons.mozilla.org/en-US/firefox/addon/hola-unblocker/'
                    }, {
                        name: 'Windscribe',
                        chrome: 'https://chrome.google.com/webstore/detail/hnmpcagpplmpfojmgmnngilcnanddlhb',
                        firefox: 'https://addons.mozilla.org/en-US/firefox/addon/windscribe/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search'
                    }, {
                        name: 'UltraSurf',
                        chrome: 'https://chrome.google.com/webstore/detail/mjnbclmflcpookeapghfhapeffmpodij'
                    }], e.firefox = navigator.userAgent.includes('Firefox'), e.supported_store = e.firefox ? 'firefox' : 'chrome', e.addon_url = t => e.firefox ? 'https://addons.mozilla.org/en-US/firefox/search/?q=' + encodeURIComponent(t) : 'https://chrome.google.com/webstore/search/' + encodeURI(t), i(8864), e.krunker && !e.is_frame && (e.frame = new a, o.is_host(location, 'browserfps.com') && i(3137), n.observe(), n.license(e.meta)), e.utils = o, !navigator.userAgent.includes('Electron') && 'object' != typeof LOADER && document.currentScript && 'SCRIPT' == document.currentScript.nodeName) throw alert('The new loader will update/install.'), setTimeout((() => location.assign('https://y9x.github.io/userscripts/loader.user.js')), 200)
            },
            573: (t, e) => {
                'use strict';
                class i {
                    constructor(t = 0, e = 0, i = 0) {
                        this.x = t, this.y = e, this.z = i
                    }
                    clone() {
                        return new i(this.x, this.y, this.z)
                    }
                    mps() {
                        return 1e3 * Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
                    }
                    set(t, e, i) {
                        return this.x = t, this.y = e, this.z = i, this
                    }
                    copy(t) {
                        return this.x = t.x, this.y = t.y, this.z = t.z, this
                    }
                    add(t) {
                        return this.x += t.x, this.y += t.y, this.z += t.z, this
                    }
                    add_vectors(t = 0, e = 0, i = 0) {
                        return this.x += t, this.y += e, this.z += i, this
                    }
                    add_scalar(t) {
                        return this.x += t, this.y += t, this.z += t, this
                    }
                    sub(t) {
                        return this.x += t.x, this.y += t.y, this.z += t.z, this
                    }
                    sub_vectors(t = 0, e = 0, i = 0) {
                        return this.x -= t, this.y -= e, this.z -= i, this
                    }
                    sub_scalar(t) {
                        return this.x -= t, this.y -= t, this.z -= t, this
                    }
                    multiply(t) {
                        return this.x *= t.x, this.y *= t.y, this.z *= t.z, this
                    }
                    multiply_vectors(t = 0, e = 0, i = 0) {
                        return this.x *= t, this.y *= e, this.z *= i, this
                    }
                    multiply_scalar(t) {
                        return this.x *= t, this.y *= t, this.z *= t, this
                    }
                    divide(t) {
                        return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
                    }
                    divide_vectors(t = 0, e = 0, i = 0) {
                        return this.x /= t, this.y /= e, this.z /= i, this
                    }
                    divide_scalar(t) {
                        return this.x /= t, this.y /= t, this.z /= t, this
                    }
                    apply_quaternion(t) {
                        const e = this.x,
                            i = this.y,
                            r = this.z,
                            s = t.x,
                            a = t.y,
                            n = t.z,
                            o = t.w,
                            h = o * e + a * r - n * i,
                            c = o * i + n * e - s * r,
                            l = o * r + s * i - a * e,
                            d = -s * e - a * i - n * r;
                        return this.x = h * o + d * -s + c * -n - l * -a, this.y = c * o + d * -a + l * -s - h * -n, this.z = l * o + d * -n + h * -a - c * -s, this
                    }
                    translate_quaternion(t, e) {
                        for (var r in e) {
                            var s = new i;
                            s[r] = 1;
                            var a = s.apply_quaternion(t).multiply_scalar(e[r]);
                            this.add(a)
                        }
                        return this
                    }
                    distance_to(t) {
                        return Math.hypot(this.x - t.x, this.y - t.y, this.z - t.z)
                    }
                }
                i.Blank = new i;
                e.Box3 = class {
                    min = new i;
                    max = new i;
                    points() {
                        return [new i(this.min.x, this.min.y, this.min.z), new i(this.min.x, this.min.y, this.max.z), new i(this.min.x, this.max.y, this.min.z), new i(this.min.x, this.max.y, this.max.z), new i(this.max.x, this.min.y, this.min.z), new i(this.max.x, this.min.y, this.max.z), new i(this.max.x, this.max.y, this.min.z), new i(this.max.x, this.max.y, this.max.z)]
                    }
                }, e.Hex3 = class {
                    hex = [0, 0, 0];
                    constructor(t = '#000') {
                        this.set_style(t)
                    }
                    add_scalar(t) {
                        for (let e in this.hex) this.hex[e] += t;
                        return this.normalize()
                    }
                    sub_scalar(t) {
                        for (let e in this.hex) this.hex[e] -= t;
                        return this.normalize()
                    }
                    normalize() {
                        for (let t in this.hex) this.hex[t] = Math.max(Math.min(this.hex[t], 255), 0);
                        return this
                    }
                    set(t, e, i) {
                        return this.hex[0] = t, this.hex[1] = e, this.hex[2] = i, this
                    }
                    set_style(t) {
                        let e = 0,
                            i = '#' == t[0] ? 1 : 0,
                            r = t.length - i < 5 ? 1 : 2;
                        for (let s = i; s < t.length; s += r) {
                            let i = t.substr(s, r);
                            1 == r && (i += i), this.hex[e++] = parseInt(i, 16)
                        }
                        return this
                    }
                    toString() {
                        var t = '#';
                        for (let e of this.hex) t += e.toString(16).padStart(2, 0);
                        return t
                    }
                }, e.Vector3 = i
            },
            3619: t => {
                'use strict';
                t.exports = class {
                    is_host(t, ...e) {
                        return e.some((e => t.hostname == e || t.hostname.endsWith('.' + e)))
                    }
                    round(t, e) {
                        return Math.round(t * Math.pow(10, e)) / Math.pow(10, e)
                    }
                    add_ele(t, e, i = {}) {
                        var r = this.crt_ele(t, i);
                        if ('function' == typeof e) this.wait_for(e).then((t => t.append(r)));
                        else {
                            if ('object' != typeof e || null == e || !e.append) throw new Error('Parent is not resolvable to a DOM element');
                            e.append(r)
                        }
                        return r
                    }
                    crt_ele(t, e = {}) {
                        var i, r = {};
                        for (let t in e) 'object' == typeof e[t] && null != e[t] && (r[t] = e[t], delete e[t]);
                        i = 'raw' == t ? this.crt_ele('div', {
                            innerHTML: e.html
                        }).firstChild : 'text' == t ? document.createTextNode('') : document.createElement(t);
                        var s = e.className;
                        s && (delete e.className, i.setAttribute('class', s));
                        var a = r.events;
                        if (a) {
                            delete r.events;
                            for (let t in a) i.addEventListener(t, a[t])
                        }
                        Object.assign(i, e);
                        for (let t in r) Object.assign(i[t], r[t]);
                        return i
                    }
                    wait_for(t, e) {
                        return new Promise((i => {
                            var r, s = () => {
                                try {
                                    var e = t();
                                    if (e) return r && clearInterval(r), i(e), !0
                                } catch (t) {
                                    console.log(t)
                                }
                            };
                            r = s() || setInterval(s, e || 50)
                        }))
                    }
                    sanitize(t) {
                        var e = document.createElement('div');
                        return e.textContent = t, e.innerHTML
                    }
                    unsanitize(t) {
                        var e = document.createElement('div');
                        return e.innerHTML = t, e.textContent
                    }
                    node_tree(t, e = document) {
                        var i = {
                                parent: e
                            },
                            r = /^\$\s+>?/g,
                            s = /^\^\s+>?/g;
                        for (var a in t) {
                            var n = t[a];
                            if (n instanceof Node) i[a] = n;
                            else if ('object' == typeof n) i[a] = this.node_tree(n, i.container);
                            else if (r.test(t[a])) {
                                if (!i.container) {
                                    console.warn('No container is available, could not access', n);
                                    continue
                                }
                                i[a] = i.container.querySelector(t[a].replace(r, ''))
                            } else if (s.test(t[a])) {
                                if (!i.parent) {
                                    console.warn('No parent is available, could not access', n);
                                    continue
                                }
                                i[a] = i.parent.querySelector(t[a].replace(s, ''))
                            } else i[a] = e.querySelector(t[a]);
                            i[a] || console.warn('No node found, could not access', n)
                        }
                        return i
                    }
                    string_key(t) {
                        return t.replace(/^([A-Z][a-z]+?)([A-Z0-9][a-z]*?)/, ((t, e, i) => ['Digit', 'Key'].includes(e) ? i : `${i} ${e}`))
                    }
                    clone_obj(t) {
                        return JSON.parse(JSON.stringify(t))
                    }
                    assign_deep(t, ...e) {
                        for (let i in e)
                            for (let r in e[i]) 'object' == typeof e[i][r] && null != e[i][r] && r in t ? this.assign_deep(t[r], e[i][r]) : 'object' == typeof t && null != t && Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e[i], r));
                        return t
                    }
                    filter_deep(t, e) {
                        for (let i in t) i in e || delete t[i], 'object' == typeof e[i] && null != e[i] && this.filter_deep(t[i], e[i]);
                        return t
                    }
                    redirect(t, e, i) {
                        var r = Symbol();
                        i.addEventListener(t, (t => {
                            t[r]
                        })), e.addEventListener(t, (e => i.dispatchEvent(Object.assign(new e.constructor(t, e), {
                            [r]: !0,
                            stopImmediatePropagation: e.stopImmediatePropagation.bind(e),
                            preventDefault: e.preventDefault.bind(e)
                        }))))
                    }
                    promise() {
                        var t, e = new Promise(((e, i) => t = {
                            resolve: e,
                            reject: i
                        }));
                        return Object.assign(e, t), e.resolve_in = (t = 0, i) => setTimeout((() => e.resolve(i)), t), e
                    }
                    rtn(t, e) {
                        return (t / e).toFixed() * e
                    }
                }
            },
            8864: (t, e, i) => {
                'use strict';
                var {
                    loader: r
                } = i(9606);
                r.var('inView', /&&!\w\.\w+&&\w\.\w+&&\w\.(\w+)\){/, 1), r.var('spectating', /team:window\.(\w+)/, 1), r.var('nAuto', /'Single Fire',varN:'(\w+)'/, 1), r.var('xDire', /this\.(\w+)=Math\.lerpAngle\(this\.\w+\[1\]\.xD/, 1), r.var('yDire', /this\.(\w+)=Math\.lerpAngle\(this\.\w+\[1\]\.yD/, 1), r.var('procInputs', /this\.(\w+)=function\(\w+,\w+,\w+,\w+\){this\.recon/, 1), r.var('isYou', /this\.accid=0,this\.(\w+)=\w+,this\.isPlayer/, 1), r.var('pchObjc', /this\.mouseX=0,this\.mouseY=0\,this\.(\w+)=new /, 1), r.var('aimVal', /this\.(\w+)-=1\/\(this\.weapon\.aimSpd/, 1), r.var('crouchVal', /this\.(\w+)\+=\w\.crouchSpd\*\w+,1<=this\.\w+/, 1), r.var('didShoot', /--,\w+\.(\w+)=!0/, 1), r.var('ammos', /length;for\(\w+=0;\w+<\w+\.(\w+)\.length/, 1), r.var('weaponIndex', /\.weaponConfig\[\w+]\.secondary&&\(\w+\.(\w+)==\w+/, 1), r.var('maxHealth', /\.regenDelay,this\.(\w+)=\w+\.mode&&\w+\.mode\.\1/, 1), r.var('adsToggled', /this\.(\w+)=!1,this\.keys=/, 1), r.var('recoilAnimY', /\.\w+=0,this\.(\w+)=0,this\.\w+=0,this\.\w+=1,this\.slide/, 1), r.var('objInstances', /lowerBody\),\w+\|\|\w+\.(\w+)\./, 1), r.var('getWorldPosition', /var \w+=\w+\.camera\.(\w+)\(\);/, 1), r.patch('Skins', /(this\.name=\w+,)(this\.score=)/g, ((t, e, i) => `${e}${r.context.key}.skins(this),${i}`)), r.patch('Nametags', /&&((\w+)\.\w+Seen)(?=\){if\(\(\w+=\2\.objInstances)/, ((t, e) => `&& ${r.context.key}.can_see(${e})`)), r.patch('Game', /(\w+)\.moveObj=func/, ((t, e) => `${r.context.key}.game(${e}),${t}`)), r.patch('Controls', /\.controls=(\w+);/, ((t, e) => `${t}${r.context.key}.controls(${e});`)), r.patch('World', /(\w+)\.backgroundScene=/, ((t, e) => `${r.context.key}.world(${e}),${t}`)), r.patch('Input', /((\w+\.\w+)\[\2\._push\?'_push':'push']\()(\w+)(\),)/, ((t, e, i, s, a) => `${e}${r.context.key}.input.push(${s})${a}`)), r.patch('ThreeJS', /\(\w+,(\w+),\w+\){(?=[a-z ';\.\(\),]+ACESFilmic)/, ((t, e) => `${t}${r.context.key}.three(${e});`)), r.patch('Inactivity', />=(\w+\.kickTimer)/g, ((t, e) => `>=${r.context.key}.kick_timer(${e})`)), r.patch('Socket', /(\w+\.exports={ahNum:)/, ((t, e) => `${r.context.key}.socket=${e}`))
            },
            914: (t, e, i) => {
                'use strict';
                var {
                    Vector3: r
                } = i(573);
                class s {
                    constructor(t) {
                        this.data = t, this.materials = new Map, this.rainbow = {
                            col: '#ffffff',
                            val: 0
                        }
                    }
                    tick_rainbow() {
                        this.rainbow.val += .6, this.rainbow.val %= 360, this.rainbow.col = this.data.utils.hexFromHue(Math.round(this.rainbow.val))
                    }
                    esp_mat(t) {
                        return this.materials.has(t) || this.materials.set(t, new this.data.three.MeshBasicMaterial({
                            transparent: !0,
                            fog: !1,
                            depthTest: !1,
                            color: t
                        })), this.materials.get(t)
                    }
                    tick() {
                        this.data.ctx.clearRect(0, 0, this.data.ctx.canvas.width, this.data.ctx.canvas.height), this.tick_rainbow()
                    }
                    draw_text(t, e, i, r) {
                        for (var s = 0; s < r.length; s++)
                            for (var a = r[s], n = 0, o = 0; o < a.length; o++) {
                                var h = a[o][0],
                                    c = a[o][1],
                                    l = [c, t + n, e + s * (i + 2)];
                                this.data.ctx.fillStyle = h, this.data.ctx.strokeText(...l), this.data.ctx.fillText(...l), n += this.data.ctx.measureText(c).width + 2
                            }
                    }
                    fov(t) {
                        var e = this.data.ctx.canvas.width * t / 100,
                            i = this.data.ctx.canvas.height * t / 100;
                        this.data.ctx.strokeStyle = '#000', this.data.ctx.lineWidth = 2, this.data.ctx.strokeRect((this.data.ctx.canvas.width - e) / 2, (this.data.ctx.canvas.height - i) / 2, e, i)
                    }
                    walls() {
                        this.data.world.scene.children.forEach((t => {
                            if ('Mesh' == t.type && t.dSrc && !t.material[s.hooked]) {
                                t.material[s.hooked] = !0;
                                var e = t.material.transparent,
                                    i = t.material.opacity;
                                Object.defineProperties(t.material, {
                                    opacity: {
                                        get: t => i * this.data.walls / 100,
                                        set: t => i = t
                                    },
                                    transparent: {
                                        get: t => 100 != this.data.walls || e,
                                        set: t => e = t
                                    }
                                })
                            }
                        }))
                    }
                    axis_join(t) {
                        return t ? ['x', 'y', 'z'].map((e => e + ': ' + t[e].toFixed(2))).join(', ') : null
                    }
                    overlay() {
                        this.data.ctx.strokeStyle = '#000', this.data.ctx.font = '14px monospace', this.data.ctx.textAlign = 'start', this.data.ctx.lineWidth = 2.6;
                        var t = {
                                Player: this.data.player ? this.axis_join(this.data.player.position) : null,
                                Target: this.data.target ? this.axis_join(this.data.target.position) : null
                            },
                            e = [];
                        for (var i in t) {
                            var r = '#FFF',
                                s = t[i];
                            switch (typeof s) {
                                case 'boolean':
                                    r = s ? '#0F0' : '#F00', s = s ? 'Yes' : 'No';
                                    break;
                                case 'number':
                                    r = '#00F', s = s.toFixed(2);
                                    break;
                                case 'object':
                                    s = 'N/A'
                            }
                            e.push([
                                ['#BBB', i + ': '],
                                [r, s]
                            ])
                        }
                        this.draw_text(15, this.data.ctx.canvas.height / 2 - 14 * e.length / 2, 14, e)
                    }
                    p2a(t) {
                        var e = this.data.utils.pos2d(t);
                        return [e.x, e.y]
                    }
                    hitbox(t) {
                        var e = t.points();
                        this.data.ctx.fillStyle = 'red', this.data.ctx.lineWidth = 1.5, this.data.ctx.moveTo(...this.p2a(e[0])), this.data.ctx.lineTo(...this.p2a(e[2])), this.data.ctx.lineTo(...this.p2a(e[4])), this.data.ctx.lineTo(...this.p2a(e[6])), this.data.ctx.lineTo(...this.p2a(e[5])), this.data.ctx.lineTo(...this.p2a(e[7])), this.data.ctx.lineTo(...this.p2a(e[1])), this.data.ctx.lineTo(...this.p2a(e[3])), this.data.ctx.lineTo(...this.p2a(e[0])), this.data.ctx.lineTo(...this.p2a(e[1])), this.data.ctx.lineTo(...this.p2a(e[5])), this.data.ctx.lineTo(...this.p2a(e[4])), this.data.ctx.lineTo(...this.p2a(e[0])), this.data.ctx.lineTo(...this.p2a(e[2])), this.data.ctx.lineTo(...this.p2a(e[3])), this.data.ctx.lineTo(...this.p2a(e[7])), this.data.ctx.lineTo(...this.p2a(e[6])), this.data.ctx.lineTo(...this.p2a(e[2])), this.data.ctx.stroke()
                    }
                    box(t) {
                        this.data.ctx.strokeStyle = t.esp_color, this.data.ctx.lineWidth = 1.5, this.data.ctx.strokeRect(t.rect.left, t.rect.top, t.rect.width, t.rect.height)
                    }
                    tracer(t) {
                        this.data.ctx.strokeStyle = t.esp_color, this.data.ctx.lineWidth = 1.75, this.data.ctx.lineCap = 'round', this.data.ctx.beginPath(), this.data.ctx.moveTo(this.data.ctx.canvas.width / 2, this.data.ctx.canvas.height), this.data.ctx.lineTo(t.rect.x, t.rect.bottom), this.data.ctx.stroke()
                    }
                    get can_draw_chams() {
                        return ['chams', 'box_chams', 'full'].includes(this.data.esp)
                    }
                    cham(t) {
                        if (!t.obj[s.hooked]) {
                            t.obj[s.hooked] = !0;
                            let e = !0;
                            Object.defineProperty(t.obj, 'visible', {
                                get: t => this.can_draw_chams || e,
                                set: t => e = t
                            })
                        }
                        t.obj.traverse((e => {
                            if ('Mesh' == e.type && !e[s.hooked]) {
                                e[s.hooked] = !0;
                                var i = e.material;
                                Object.defineProperty(e, 'material', {
                                    get: e => {
                                        var r = this.can_draw_chams ? this.esp_mat(t.esp_color) : i;
                                        return r.wireframe = this.data.wireframe, r
                                    },
                                    set: t => i = t
                                })
                            }
                        }))
                    }
                    health(t) {
                        this.data.ctx.save(), this.data.ctx.scale(...t.box_scale);
                        var e = t.scale_rect(...t.box_scale);
                        this.data.ctx.fillStyle = t.hp_color, this.data.ctx.fillRect(e.left - 30, e.top, 25, e.height), this.data.ctx.restore()
                    }
                    text(t) {
                        this.data.ctx.save(), this.data.ctx.scale(...t.dist_scale);
                        var e = t.scale_rect(...t.dist_scale);
                        this.data.ctx.font = 'Bold 13px Tahoma', this.data.ctx.strokeStyle = '#000', this.data.ctx.lineWidth = 2.5, this.data.ctx.textBaseline = 'top';
                        var i = [
                            [
                                ['#FB8', t.alias],
                                ['#FFF', t.clan ? ' [' + t.clan + ']' : '']
                            ],
                            [
                                [t.hp_color, t.health + '/' + t.max_health + ' HP']
                            ],
                            [
                                ['#FFF', t.weapon.name]
                            ]
                        ];
                        t.target && i.push([
                            ['#00F', 'Target']
                        ]), this.draw_text(e.right + 4, e.top, 13, i), this.data.ctx.restore()
                    }
                    text_clean(t) {
                        this.data.ctx.save(), this.data.ctx.scale(...t.dist_scale);
                        var e = t.scale_rect(...t.dist_scale);
                        this.data.ctx.font = 'Bold 17px Tahoma', this.data.ctx.fillStyle = 'white', this.data.ctx.strokeStyle = 'black', this.data.ctx.lineWidth = 1;
                        let i = e.right + 7,
                            r = e.top,
                            s = t.name || t.alias;
                        this.data.ctx.fillText(s, i, r), this.data.ctx.strokeText(s, i, r), r += 16, this.data.ctx.font = 'Bold 15px Tahoma', this.data.ctx.fillStyle = '#cccccc', this.data.ctx.fillText(t.weapon.name, i, r), this.data.ctx.strokeText(t.weapon.name, i, r), r += 16, this.data.ctx.fillStyle = t.hp_color, this.data.ctx.fillText(t.health + ' HP', i, r), this.data.ctx.strokeText(t.health + ' HP', i, r), this.data.ctx.restore()
                    }
                }
                s.hooked = Symbol(), t.exports = s
            },
            7846: t => {
                ! function(e) {
                    t.exports = e;
                    var i = {
                        on: function(t, e) {
                            return a(this, t).push(e), this
                        },
                        once: function(t, e) {
                            var i = this;
                            return r.originalListener = e, a(i, t).push(r), i;

                            function r() {
                                s.call(i, t, r), e.apply(this, arguments)
                            }
                        },
                        off: s,
                        emit: function(t, e) {
                            var i = this,
                                r = a(i, t, !0);
                            if (!r) return !1;
                            var s = arguments.length;
                            if (1 === s) r.forEach(o);
                            else if (2 === s) r.forEach(h);
                            else {
                                var n = Array.prototype.slice.call(arguments, 1);
                                r.forEach(c)
                            }
                            return !!r.length;

                            function o(t) {
                                t.call(i)
                            }

                            function h(t) {
                                t.call(i, e)
                            }

                            function c(t) {
                                t.apply(i, n)
                            }
                        }
                    };

                    function r(t) {
                        for (var e in i) t[e] = i[e];
                        return t
                    }

                    function s(t, e) {
                        var i, r = this;
                        if (arguments.length) {
                            if (e) {
                                if (i = a(r, t, !0)) {
                                    if (!(i = i.filter(n)).length) return s.call(r, t);
                                    r.listeners[t] = i
                                }
                            } else if ((i = r.listeners) && (delete i[t], !Object.keys(i).length)) return s.call(r)
                        } else delete r.listeners;
                        return r;

                        function n(t) {
                            return t !== e && t.originalListener !== e
                        }
                    }

                    function a(t, e, i) {
                        if (!i || t.listeners) {
                            var r = t.listeners || (t.listeners = {});
                            return r[e] || (r[e] = [])
                        }
                    }
                    r(e.prototype), e.mixin = r
                }((function t() {
                    if (!(this instanceof t)) return new t
                }))
            },
            8898: (t, e) => {
                e.read = function(t, e, i, r, s) {
                    var a, n, o = 8 * s - r - 1,
                        h = (1 << o) - 1,
                        c = h >> 1,
                        l = -7,
                        d = i ? s - 1 : 0,
                        u = i ? -1 : 1,
                        f = t[e + d];
                    for (d += u, a = f & (1 << -l) - 1, f >>= -l, l += o; l > 0; a = 256 * a + t[e + d], d += u, l -= 8);
                    for (n = a & (1 << -l) - 1, a >>= -l, l += r; l > 0; n = 256 * n + t[e + d], d += u, l -= 8);
                    if (0 === a) a = 1 - c;
                    else {
                        if (a === h) return n ? NaN : 1 / 0 * (f ? -1 : 1);
                        n += Math.pow(2, r), a -= c
                    }
                    return (f ? -1 : 1) * n * Math.pow(2, a - r)
                }, e.write = function(t, e, i, r, s, a) {
                    var n, o, h, c = 8 * a - s - 1,
                        l = (1 << c) - 1,
                        d = l >> 1,
                        u = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        f = r ? 0 : a - 1,
                        p = r ? 1 : -1,
                        m = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
                    for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (o = isNaN(e) ? 1 : 0, n = l) : (n = Math.floor(Math.log(e) / Math.LN2), e * (h = Math.pow(2, -n)) < 1 && (n--, h *= 2), (e += n + d >= 1 ? u / h : u * Math.pow(2, 1 - d)) * h >= 2 && (n++, h /= 2), n + d >= l ? (o = 0, n = l) : n + d >= 1 ? (o = (e * h - 1) * Math.pow(2, s), n += d) : (o = e * Math.pow(2, d - 1) * Math.pow(2, s), n = 0)); s >= 8; t[i + f] = 255 & o, f += p, o /= 256, s -= 8);
                    for (n = n << s | o, c += s; c > 0; t[i + f] = 255 & n, f += p, n /= 256, c -= 8);
                    t[i + f - p] |= 128 * m
                }
            },
            7137: function(t, e) {
                ! function(t) {
                    var e, i = 'undefined',
                        r = i !== typeof Buffer && Buffer,
                        s = i !== typeof Uint8Array && Uint8Array,
                        a = i !== typeof ArrayBuffer && ArrayBuffer,
                        n = [0, 0, 0, 0, 0, 0, 0, 0],
                        o = Array.isArray || function(t) {
                            return !!t && '[object Array]' == Object.prototype.toString.call(t)
                        },
                        h = 4294967296;

                    function c(o, c, g) {
                        var b = c ? 0 : 4,
                            _ = c ? 4 : 0,
                            k = c ? 0 : 3,
                            E = c ? 1 : 2,
                            S = c ? 2 : 1,
                            M = c ? 3 : 0,
                            z = c ? y : w,
                            A = c ? v : x,
                            j = U.prototype,
                            B = 'is' + o,
                            T = '_' + B;
                        return j.buffer = void 0, j.offset = 0, j[T] = !0, j.toNumber = P, j.toString = function(t) {
                            var e = this.buffer,
                                i = this.offset,
                                r = L(e, i + b),
                                s = L(e, i + _),
                                a = '',
                                n = !g && 2147483648 & r;
                            n && (r = ~r, s = h - s);
                            t = t || 10;
                            for (;;) {
                                var o = r % t * h + s;
                                if (r = Math.floor(r / t), s = Math.floor(o / t), a = (o % t).toString(t) + a, !r && !s) break
                            }
                            n && (a = '-' + a);
                            return a
                        }, j.toJSON = P, j.toArray = l, r && (j.toBuffer = d), s && (j.toArrayBuffer = u), U[B] = function(t) {
                            return !(!t || !t[T])
                        }, t[o] = U, U;

                        function U(t, r, o, c) {
                            return this instanceof U ? function(t, r, o, c, l) {
                                s && a && (r instanceof a && (r = new s(r)), c instanceof a && (c = new s(c)));
                                if (!(r || o || c || e)) return void(t.buffer = m(n, 0));
                                if (!f(r, o)) {
                                    l = o, c = r, o = 0, r = new(e || Array)(8)
                                }
                                if (t.buffer = r, t.offset = o |= 0, i === typeof c) return;
                                'string' == typeof c ? function(t, e, i, r) {
                                    var s = 0,
                                        a = i.length,
                                        n = 0,
                                        o = 0;
                                    '-' === i[0] && s++;
                                    var c = s;
                                    for (; s < a;) {
                                        var l = parseInt(i[s++], r);
                                        if (!(l >= 0)) break;
                                        o = o * r + l, n = n * r + Math.floor(o / h), o %= h
                                    }
                                    c && (n = ~n, o ? o = h - o : n++);
                                    N(t, e + b, n), N(t, e + _, o)
                                }(r, o, c, l || 10) : f(c, l) ? p(r, o, c, l) : 'number' == typeof l ? (N(r, o + b, c), N(r, o + _, l)) : c > 0 ? z(r, o, c) : c < 0 ? A(r, o, c) : p(r, o, n, 0)
                            }(this, t, r, o, c) : new U(t, r, o, c)
                        }

                        function P() {
                            var t = this.buffer,
                                e = this.offset,
                                i = L(t, e + b),
                                r = L(t, e + _);
                            return g || (i |= 0), i ? i * h + r : r
                        }

                        function N(t, e, i) {
                            t[e + M] = 255 & i, i >>= 8, t[e + S] = 255 & i, i >>= 8, t[e + E] = 255 & i, i >>= 8, t[e + k] = 255 & i
                        }

                        function L(t, e) {
                            return 16777216 * t[e + k] + (t[e + E] << 16) + (t[e + S] << 8) + t[e + M]
                        }
                    }

                    function l(t) {
                        var i = this.buffer,
                            r = this.offset;
                        return e = null, !1 !== t && 0 === r && 8 === i.length && o(i) ? i : m(i, r)
                    }

                    function d(t) {
                        var i = this.buffer,
                            s = this.offset;
                        if (e = r, !1 !== t && 0 === s && 8 === i.length && Buffer.isBuffer(i)) return i;
                        var a = new r(8);
                        return p(a, 0, i, s), a
                    }

                    function u(t) {
                        var i = this.buffer,
                            r = this.offset,
                            n = i.buffer;
                        if (e = s, !1 !== t && 0 === r && n instanceof a && 8 === n.byteLength) return n;
                        var o = new s(8);
                        return p(o, 0, i, r), o.buffer
                    }

                    function f(t, e) {
                        var i = t && t.length;
                        return e |= 0, i && e + 8 <= i && 'string' != typeof t[e]
                    }

                    function p(t, e, i, r) {
                        e |= 0, r |= 0;
                        for (var s = 0; s < 8; s++) t[e++] = 255 & i[r++]
                    }

                    function m(t, e) {
                        return Array.prototype.slice.call(t, e, e + 8)
                    }

                    function y(t, e, i) {
                        for (var r = e + 8; r > e;) t[--r] = 255 & i, i /= 256
                    }

                    function v(t, e, i) {
                        var r = e + 8;
                        for (i++; r > e;) t[--r] = 255 & -i ^ 255, i /= 256
                    }

                    function w(t, e, i) {
                        for (var r = e + 8; e < r;) t[e++] = 255 & i, i /= 256
                    }

                    function x(t, e, i) {
                        var r = e + 8;
                        for (i++; e < r;) t[e++] = 255 & -i ^ 255, i /= 256
                    }
                    c('Uint64BE', !0, !0), c('Int64BE', !0, !1), c('Uint64LE', !1, !0), c('Int64LE', !1, !1)
                }('string' != typeof e.nodeName ? e : this || {})
            },
            5182: t => {
                var e = {}.toString;
                t.exports = Array.isArray || function(t) {
                    return '[object Array]' == e.call(t)
                }
            },
            3229: (t, e, i) => {
                e.encode = i(7483).encode, e.decode = i(7296).decode, e.Encoder = i(9285).Encoder, e.Decoder = i(5988).Decoder, e.createCodec = i(6059).createCodec, e.codec = i(3626).codec
            },
            4122: function(t) {
                function e(t) {
                    return t && t.isBuffer && t
                }
                t.exports = e('undefined' != typeof Buffer && Buffer) || e(this.Buffer) || e('undefined' != typeof window && window.Buffer) || this.Buffer
            },
            1891: (t, e) => {
                e.copy = function(t, e, i, r) {
                    var s;
                    i || (i = 0);
                    r || 0 === r || (r = this.length);
                    e || (e = 0);
                    var a = r - i;
                    if (t === this && i < e && e < r)
                        for (s = a - 1; s >= 0; s--) t[s + e] = this[s + i];
                    else
                        for (s = 0; s < a; s++) t[s + e] = this[s + i];
                    return a
                }, e.toString = function(t, e, i) {
                    var r = this,
                        s = 0 | e;
                    i || (i = r.length);
                    var a = '',
                        n = 0;
                    for (; s < i;)(n = r[s++]) < 128 ? a += String.fromCharCode(n) : (192 == (224 & n) ? n = (31 & n) << 6 | 63 & r[s++] : 224 == (240 & n) ? n = (15 & n) << 12 | (63 & r[s++]) << 6 | 63 & r[s++] : 240 == (248 & n) && (n = (7 & n) << 18 | (63 & r[s++]) << 12 | (63 & r[s++]) << 6 | 63 & r[s++]), n >= 65536 ? (n -= 65536, a += String.fromCharCode(55296 + (n >>> 10), 56320 + (1023 & n))) : a += String.fromCharCode(n));
                    return a
                }, e.write = function(t, e) {
                    var i = this,
                        r = e || (e |= 0),
                        s = t.length,
                        a = 0,
                        n = 0;
                    for (; n < s;)(a = t.charCodeAt(n++)) < 128 ? i[r++] = a : a < 2048 ? (i[r++] = 192 | a >>> 6, i[r++] = 128 | 63 & a) : a < 55296 || a > 57343 ? (i[r++] = 224 | a >>> 12, i[r++] = 128 | a >>> 6 & 63, i[r++] = 128 | 63 & a) : (a = 65536 + (a - 55296 << 10 | t.charCodeAt(n++) - 56320), i[r++] = 240 | a >>> 18, i[r++] = 128 | a >>> 12 & 63, i[r++] = 128 | a >>> 6 & 63, i[r++] = 128 | 63 & a);
                    return r - e
                }
            },
            2169: (t, e, i) => {
                var r = i(8918),
                    s = t.exports = a(0);

                function a(t) {
                    return new Array(t)
                }
                s.alloc = a, s.concat = r.concat, s.from = function(t) {
                    if (!r.isBuffer(t) && r.isView(t)) t = r.Uint8Array.from(t);
                    else if (r.isArrayBuffer(t)) t = new Uint8Array(t);
                    else {
                        if ('string' == typeof t) return r.from.call(s, t);
                        if ('number' == typeof t) throw new TypeError('"value" argument must not be a number')
                    }
                    return Array.prototype.slice.call(t)
                }
            },
            5837: (t, e, i) => {
                var r = i(8918),
                    s = r.global,
                    a = t.exports = r.hasBuffer ? n(0) : [];

                function n(t) {
                    return new s(t)
                }
                a.alloc = r.hasBuffer && s.alloc || n, a.concat = r.concat, a.from = function(t) {
                    if (!r.isBuffer(t) && r.isView(t)) t = r.Uint8Array.from(t);
                    else if (r.isArrayBuffer(t)) t = new Uint8Array(t);
                    else {
                        if ('string' == typeof t) return r.from.call(a, t);
                        if ('number' == typeof t) throw new TypeError('"value" argument must not be a number')
                    }
                    return s.from && 1 !== s.from.length ? s.from(t) : new s(t)
                }
            },
            5706: (t, e, i) => {
                var r, s = i(1891);
                e.copy = c, e.slice = l, e.toString = function(t, e, i) {
                    var r = !o && a.isBuffer(this) ? this.toString : s.toString;
                    return r.apply(this, arguments)
                }, e.write = (r = 'write', function() {
                    return (this[r] || s[r]).apply(this, arguments)
                });
                var a = i(8918),
                    n = a.global,
                    o = a.hasBuffer && 'TYPED_ARRAY_SUPPORT' in n,
                    h = o && !n.TYPED_ARRAY_SUPPORT;

                function c(t, e, i, r) {
                    var n = a.isBuffer(this),
                        o = a.isBuffer(t);
                    if (n && o) return this.copy(t, e, i, r);
                    if (h || n || o || !a.isView(this) || !a.isView(t)) return s.copy.call(this, t, e, i, r);
                    var c = i || null != r ? l.call(this, i, r) : this;
                    return t.set(c, e), c.length
                }

                function l(t, e) {
                    var i = this.slice || !h && this.subarray;
                    if (i) return i.call(this, t, e);
                    var r = a.alloc.call(this, e - t);
                    return c.call(this, r, 0, t, e), r
                }
            },
            8513: (t, e, i) => {
                var r = i(8918),
                    s = t.exports = r.hasArrayBuffer ? a(0) : [];

                function a(t) {
                    return new Uint8Array(t)
                }
                s.alloc = a, s.concat = r.concat, s.from = function(t) {
                    if (r.isView(t)) {
                        var e = t.byteOffset,
                            i = t.byteLength;
                        (t = t.buffer).byteLength !== i && (t.slice ? t = t.slice(e, e + i) : (t = new Uint8Array(t)).byteLength !== i && (t = Array.prototype.slice.call(t, e, e + i)))
                    } else {
                        if ('string' == typeof t) return r.from.call(s, t);
                        if ('number' == typeof t) throw new TypeError('"value" argument must not be a number')
                    }
                    return new Uint8Array(t)
                }
            },
            8918: (t, e, i) => {
                var r = e.global = i(4122),
                    s = e.hasBuffer = r && !!r.isBuffer,
                    a = e.hasArrayBuffer = 'undefined' != typeof ArrayBuffer,
                    n = e.isArray = i(5182);
                e.isArrayBuffer = a ? function(t) {
                    return t instanceof ArrayBuffer || p(t)
                } : v;
                var o = e.isBuffer = s ? r.isBuffer : v,
                    h = e.isView = a ? ArrayBuffer.isView || w('ArrayBuffer', 'buffer') : v;
                e.alloc = f, e.concat = function(t, i) {
                    i || (i = 0, Array.prototype.forEach.call(t, (function(t) {
                        i += t.length
                    })));
                    var r = this !== e && this || t[0],
                        s = f.call(r, i),
                        a = 0;
                    return Array.prototype.forEach.call(t, (function(t) {
                        a += u.copy.call(t, s, a)
                    })), s
                }, e.from = function(t) {
                    return 'string' == typeof t ? m.call(this, t) : y(this).from(t)
                };
                var c = e.Array = i(2169),
                    l = e.Buffer = i(5837),
                    d = e.Uint8Array = i(8513),
                    u = e.prototype = i(5706);

                function f(t) {
                    return y(this).alloc(t)
                }
                var p = w('ArrayBuffer');

                function m(t) {
                    var e = 3 * t.length,
                        i = f.call(this, e),
                        r = u.write.call(i, t);
                    return e !== r && (i = u.slice.call(i, 0, r)), i
                }

                function y(t) {
                    return o(t) ? l : h(t) ? d : n(t) ? c : s ? l : a ? d : c
                }

                function v() {
                    return !1
                }

                function w(t, e) {
                    return t = '[object ' + t + ']',
                        function(i) {
                            return null != i && {}.toString.call(e ? i[e] : i) === t
                        }
                }
            },
            8551: (t, e, i) => {
                var r = i(5182);
                e.createCodec = o, e.install = function(t) {
                    for (var e in t) a.prototype[e] = n(a.prototype[e], t[e])
                }, e.filter = function(t) {
                    return r(t) ? function(t) {
                        return t = t.slice(),
                            function(i) {
                                return t.reduce(e, i)
                            };

                        function e(t, e) {
                            return e(t)
                        }
                    }(t) : t
                };
                var s = i(8918);

                function a(t) {
                    if (!(this instanceof a)) return new a(t);
                    this.options = t, this.init()
                }

                function n(t, e) {
                    return t && e ? function() {
                        return t.apply(this, arguments), e.apply(this, arguments)
                    } : t || e
                }

                function o(t) {
                    return new a(t)
                }
                a.prototype.init = function() {
                    var t = this.options;
                    return t && t.uint8array && (this.bufferish = s.Uint8Array), this
                }, e.preset = o({
                    preset: !0
                })
            },
            3626: (t, e, i) => {
                i(5440), i(9339), e.codec = {
                    preset: i(8551).preset
                }
            },
            7323: (t, e, i) => {
                e.T = s;
                var r = i(5440).preset;

                function s(t) {
                    if (!(this instanceof s)) return new s(t);
                    if (t && (this.options = t, t.codec)) {
                        var e = this.codec = t.codec;
                        e.bufferish && (this.bufferish = e.bufferish)
                    }
                }
                i(2193).k.mixin(s.prototype), s.prototype.codec = r, s.prototype.fetch = function() {
                    return this.codec.decode(this)
                }
            },
            7296: (t, e, i) => {
                e.decode = function(t, e) {
                    var i = new r(e);
                    return i.write(t), i.read()
                };
                var r = i(7323).T
            },
            5988: (t, e, i) => {
                e.Decoder = a;
                var r = i(7846),
                    s = i(7323).T;

                function a(t) {
                    if (!(this instanceof a)) return new a(t);
                    s.call(this, t)
                }
                a.prototype = new s, r.mixin(a.prototype), a.prototype.decode = function(t) {
                    arguments.length && this.write(t), this.flush()
                }, a.prototype.push = function(t) {
                    this.emit('data', t)
                }, a.prototype.end = function(t) {
                    this.decode(t), this.emit('end')
                }
            },
            2425: (t, e, i) => {
                e.F = s;
                var r = i(9339).preset;

                function s(t) {
                    if (!(this instanceof s)) return new s(t);
                    if (t && (this.options = t, t.codec)) {
                        var e = this.codec = t.codec;
                        e.bufferish && (this.bufferish = e.bufferish)
                    }
                }
                i(2193).I.mixin(s.prototype), s.prototype.codec = r, s.prototype.write = function(t) {
                    this.codec.encode(this, t)
                }
            },
            7483: (t, e, i) => {
                e.encode = function(t, e) {
                    var i = new r(e);
                    return i.write(t), i.read()
                };
                var r = i(2425).F
            },
            9285: (t, e, i) => {
                e.Encoder = a;
                var r = i(7846),
                    s = i(2425).F;

                function a(t) {
                    if (!(this instanceof a)) return new a(t);
                    s.call(this, t)
                }
                a.prototype = new s, r.mixin(a.prototype), a.prototype.encode = function(t) {
                    this.write(t), this.emit('data', this.read())
                }, a.prototype.end = function(t) {
                    arguments.length && this.encode(t), this.flush(), this.emit('end')
                }
            },
            7386: (t, e, i) => {
                e.S = function t(e, i) {
                    if (!(this instanceof t)) return new t(e, i);
                    this.buffer = r.from(e), this.type = i
                };
                var r = i(8918)
            },
            7754: (t, e, i) => {
                e.setExtPackers = function(t) {
                    t.addExtPacker(14, Error, [d, h]), t.addExtPacker(1, EvalError, [d, h]), t.addExtPacker(2, RangeError, [d, h]), t.addExtPacker(3, ReferenceError, [d, h]), t.addExtPacker(4, SyntaxError, [d, h]), t.addExtPacker(5, TypeError, [d, h]), t.addExtPacker(6, URIError, [d, h]), t.addExtPacker(10, RegExp, [l, h]), t.addExtPacker(11, Boolean, [c, h]), t.addExtPacker(12, String, [c, h]), t.addExtPacker(13, Date, [Number, h]), t.addExtPacker(15, Number, [c, h]), 'undefined' != typeof Uint8Array && (t.addExtPacker(17, Int8Array, n), t.addExtPacker(18, Uint8Array, n), t.addExtPacker(19, Int16Array, n), t.addExtPacker(20, Uint16Array, n), t.addExtPacker(21, Int32Array, n), t.addExtPacker(22, Uint32Array, n), t.addExtPacker(23, Float32Array, n), 'undefined' != typeof Float64Array && t.addExtPacker(24, Float64Array, n), 'undefined' != typeof Uint8ClampedArray && t.addExtPacker(25, Uint8ClampedArray, n), t.addExtPacker(26, ArrayBuffer, n), t.addExtPacker(29, DataView, n));
                    s.hasBuffer && t.addExtPacker(27, a, s.from)
                };
                var r, s = i(8918),
                    a = s.global,
                    n = s.Uint8Array.from,
                    o = {
                        name: 1,
                        message: 1,
                        stack: 1,
                        columnNumber: 1,
                        fileName: 1,
                        lineNumber: 1
                    };

                function h(t) {
                    return r || (r = i(7483).encode), r(t)
                }

                function c(t) {
                    return t.valueOf()
                }

                function l(t) {
                    (t = RegExp.prototype.toString.call(t).split('/')).shift();
                    var e = [t.pop()];
                    return e.unshift(t.join('/')), e
                }

                function d(t) {
                    var e = {};
                    for (var i in o) e[i] = t[i];
                    return e
                }
            },
            7660: (t, e, i) => {
                e.setExtUnpackers = function(t) {
                    t.addExtUnpacker(14, [o, c(Error)]), t.addExtUnpacker(1, [o, c(EvalError)]), t.addExtUnpacker(2, [o, c(RangeError)]), t.addExtUnpacker(3, [o, c(ReferenceError)]), t.addExtUnpacker(4, [o, c(SyntaxError)]), t.addExtUnpacker(5, [o, c(TypeError)]), t.addExtUnpacker(6, [o, c(URIError)]), t.addExtUnpacker(10, [o, h]), t.addExtUnpacker(11, [o, l(Boolean)]), t.addExtUnpacker(12, [o, l(String)]), t.addExtUnpacker(13, [o, l(Date)]), t.addExtUnpacker(15, [o, l(Number)]), 'undefined' != typeof Uint8Array && (t.addExtUnpacker(17, l(Int8Array)), t.addExtUnpacker(18, l(Uint8Array)), t.addExtUnpacker(19, [d, l(Int16Array)]), t.addExtUnpacker(20, [d, l(Uint16Array)]), t.addExtUnpacker(21, [d, l(Int32Array)]), t.addExtUnpacker(22, [d, l(Uint32Array)]), t.addExtUnpacker(23, [d, l(Float32Array)]), 'undefined' != typeof Float64Array && t.addExtUnpacker(24, [d, l(Float64Array)]), 'undefined' != typeof Uint8ClampedArray && t.addExtUnpacker(25, l(Uint8ClampedArray)), t.addExtUnpacker(26, d), t.addExtUnpacker(29, [d, l(DataView)]));
                    s.hasBuffer && t.addExtUnpacker(27, l(a))
                };
                var r, s = i(8918),
                    a = s.global,
                    n = {
                        name: 1,
                        message: 1,
                        stack: 1,
                        columnNumber: 1,
                        fileName: 1,
                        lineNumber: 1
                    };

                function o(t) {
                    return r || (r = i(7296).decode), r(t)
                }

                function h(t) {
                    return RegExp.apply(null, t)
                }

                function c(t) {
                    return function(e) {
                        var i = new t;
                        for (var r in n) i[r] = e[r];
                        return i
                    }
                }

                function l(t) {
                    return function(e) {
                        return new t(e)
                    }
                }

                function d(t) {
                    return new Uint8Array(t).buffer
                }
            },
            6059: (t, e, i) => {
                i(5440), i(9339), e.createCodec = i(8551).createCodec
            },
            2193: (t, e, i) => {
                e.k = a, e.I = n;
                var r = i(8918),
                    s = 'BUFFER_SHORTAGE';

                function a() {
                    if (!(this instanceof a)) return new a
                }

                function n() {
                    if (!(this instanceof n)) return new n
                }

                function o() {
                    throw new Error('method not implemented: write()')
                }

                function h() {
                    throw new Error('method not implemented: fetch()')
                }

                function c() {
                    return this.buffers && this.buffers.length ? (this.flush(), this.pull()) : this.fetch()
                }

                function l(t) {
                    (this.buffers || (this.buffers = [])).push(t)
                }

                function d() {
                    return (this.buffers || (this.buffers = [])).shift()
                }

                function u(t) {
                    return function(e) {
                        for (var i in t) e[i] = t[i];
                        return e
                    }
                }
                a.mixin = u({
                    bufferish: r,
                    write: function(t) {
                        var e = this.offset ? r.prototype.slice.call(this.buffer, this.offset) : this.buffer;
                        this.buffer = e ? t ? this.bufferish.concat([e, t]) : e : t, this.offset = 0
                    },
                    fetch: h,
                    flush: function() {
                        for (; this.offset < this.buffer.length;) {
                            var t, e = this.offset;
                            try {
                                t = this.fetch()
                            } catch (t) {
                                if (t && t.message != s) throw t;
                                this.offset = e;
                                break
                            }
                            this.push(t)
                        }
                    },
                    push: l,
                    pull: d,
                    read: c,
                    reserve: function(t) {
                        var e = this.offset,
                            i = e + t;
                        if (i > this.buffer.length) throw new Error(s);
                        return this.offset = i, e
                    },
                    offset: 0
                }), a.mixin(a.prototype), n.mixin = u({
                    bufferish: r,
                    write: o,
                    fetch: function() {
                        var t = this.start;
                        if (t < this.offset) {
                            var e = this.start = this.offset;
                            return r.prototype.slice.call(this.buffer, t, e)
                        }
                    },
                    flush: function() {
                        for (; this.start < this.offset;) {
                            var t = this.fetch();
                            t && this.push(t)
                        }
                    },
                    push: l,
                    pull: function() {
                        var t = this.buffers || (this.buffers = []),
                            e = t.length > 1 ? this.bufferish.concat(t) : t[0];
                        return t.length = 0, e
                    },
                    read: c,
                    reserve: function(t) {
                        var e = 0 | t;
                        if (this.buffer) {
                            var i = this.buffer.length,
                                r = 0 | this.offset,
                                s = r + e;
                            if (s < i) return this.offset = s, r;
                            this.flush(), t = Math.max(t, Math.min(2 * i, this.maxBufferSize))
                        }
                        return t = Math.max(t, this.minBufferSize), this.buffer = this.bufferish.alloc(t), this.start = 0, this.offset = e, 0
                    },
                    send: function(t) {
                        var e = t.length;
                        if (e > this.minBufferSize) this.flush(), this.push(t);
                        else {
                            var i = this.reserve(e);
                            r.prototype.copy.call(t, this.buffer, i)
                        }
                    },
                    maxBufferSize: 65536,
                    minBufferSize: 2048,
                    offset: 0,
                    start: 0
                }), n.mixin(n.prototype)
            },
            5440: (t, e, i) => {
                var r = i(7386).S,
                    s = i(7660),
                    a = i(8209).readUint8,
                    n = i(2680),
                    o = i(8551);

                function h() {
                    var t = this.options;
                    return this.decode = function(t) {
                        var e = n.getReadToken(t);
                        return function(t) {
                            var i = a(t),
                                r = e[i];
                            if (!r) throw new Error('Invalid type: ' + (i ? '0x' + i.toString(16) : i));
                            return r(t)
                        }
                    }(t), t && t.preset && s.setExtUnpackers(this), this
                }
                o.install({
                    addExtUnpacker: function(t, e) {
                        (this.extUnpackers || (this.extUnpackers = []))[t] = o.filter(e)
                    },
                    getExtUnpacker: function(t) {
                        return (this.extUnpackers || (this.extUnpackers = []))[t] || function(e) {
                            return new r(e, t)
                        }
                    },
                    init: h
                }), e.preset = h.call(o.preset)
            },
            8209: (t, e, i) => {
                var r = i(8898),
                    s = i(7137),
                    a = s.Uint64BE,
                    n = s.Int64BE;
                e.getReadFormat = function(t) {
                    var e = o.hasArrayBuffer && t && t.binarraybuffer,
                        i = t && t.int64;
                    return {
                        map: c && t && t.usemap ? d : l,
                        array: u,
                        str: f,
                        bin: e ? m : p,
                        ext: y,
                        uint8: v,
                        uint16: x,
                        uint32: b,
                        uint64: k(8, i ? M : E),
                        int8: w,
                        int16: g,
                        int32: _,
                        int64: k(8, i ? z : S),
                        float32: k(4, A),
                        float64: k(8, j)
                    }
                }, e.readUint8 = v;
                var o = i(8918),
                    h = i(5706),
                    c = 'undefined' != typeof Map;

                function l(t, e) {
                    var i, r = {},
                        s = new Array(e),
                        a = new Array(e),
                        n = t.codec.decode;
                    for (i = 0; i < e; i++) s[i] = n(t), a[i] = n(t);
                    for (i = 0; i < e; i++) r[s[i]] = a[i];
                    return r
                }

                function d(t, e) {
                    var i, r = new Map,
                        s = new Array(e),
                        a = new Array(e),
                        n = t.codec.decode;
                    for (i = 0; i < e; i++) s[i] = n(t), a[i] = n(t);
                    for (i = 0; i < e; i++) r.set(s[i], a[i]);
                    return r
                }

                function u(t, e) {
                    for (var i = new Array(e), r = t.codec.decode, s = 0; s < e; s++) i[s] = r(t);
                    return i
                }

                function f(t, e) {
                    var i = t.reserve(e),
                        r = i + e;
                    return h.toString.call(t.buffer, 'utf-8', i, r)
                }

                function p(t, e) {
                    var i = t.reserve(e),
                        r = i + e,
                        s = h.slice.call(t.buffer, i, r);
                    return o.from(s)
                }

                function m(t, e) {
                    var i = t.reserve(e),
                        r = i + e,
                        s = h.slice.call(t.buffer, i, r);
                    return o.Uint8Array.from(s).buffer
                }

                function y(t, e) {
                    var i = t.reserve(e + 1),
                        r = t.buffer[i++],
                        s = i + e,
                        a = t.codec.getExtUnpacker(r);
                    if (!a) throw new Error('Invalid ext type: ' + (r ? '0x' + r.toString(16) : r));
                    return a(h.slice.call(t.buffer, i, s))
                }

                function v(t) {
                    var e = t.reserve(1);
                    return t.buffer[e]
                }

                function w(t) {
                    var e = t.reserve(1),
                        i = t.buffer[e];
                    return 128 & i ? i - 256 : i
                }

                function x(t) {
                    var e = t.reserve(2),
                        i = t.buffer;
                    return i[e++] << 8 | i[e]
                }

                function g(t) {
                    var e = t.reserve(2),
                        i = t.buffer,
                        r = i[e++] << 8 | i[e];
                    return 32768 & r ? r - 65536 : r
                }

                function b(t) {
                    var e = t.reserve(4),
                        i = t.buffer;
                    return 16777216 * i[e++] + (i[e++] << 16) + (i[e++] << 8) + i[e]
                }

                function _(t) {
                    var e = t.reserve(4),
                        i = t.buffer;
                    return i[e++] << 24 | i[e++] << 16 | i[e++] << 8 | i[e]
                }

                function k(t, e) {
                    return function(i) {
                        var r = i.reserve(t);
                        return e.call(i.buffer, r, true)
                    }
                }

                function E(t) {
                    return new a(this, t).toNumber()
                }

                function S(t) {
                    return new n(this, t).toNumber()
                }

                function M(t) {
                    return new a(this, t)
                }

                function z(t) {
                    return new n(this, t)
                }

                function A(t) {
                    return r.read(this, t, !1, 23, 4)
                }

                function j(t) {
                    return r.read(this, t, !1, 52, 8)
                }
            },
            2680: (t, e, i) => {
                var r = i(8209);

                function s(t) {
                    var e, i = new Array(256);
                    for (e = 0; e <= 127; e++) i[e] = a(e);
                    for (e = 128; e <= 143; e++) i[e] = o(e - 128, t.map);
                    for (e = 144; e <= 159; e++) i[e] = o(e - 144, t.array);
                    for (e = 160; e <= 191; e++) i[e] = o(e - 160, t.str);
                    for (i[192] = a(null), i[193] = null, i[194] = a(!1), i[195] = a(!0), i[196] = n(t.uint8, t.bin), i[197] = n(t.uint16, t.bin), i[198] = n(t.uint32, t.bin), i[199] = n(t.uint8, t.ext), i[200] = n(t.uint16, t.ext), i[201] = n(t.uint32, t.ext), i[202] = t.float32, i[203] = t.float64, i[204] = t.uint8, i[205] = t.uint16, i[206] = t.uint32, i[207] = t.uint64, i[208] = t.int8, i[209] = t.int16, i[210] = t.int32, i[211] = t.int64, i[212] = o(1, t.ext), i[213] = o(2, t.ext), i[214] = o(4, t.ext), i[215] = o(8, t.ext), i[216] = o(16, t.ext), i[217] = n(t.uint8, t.str), i[218] = n(t.uint16, t.str), i[219] = n(t.uint32, t.str), i[220] = n(t.uint16, t.array), i[221] = n(t.uint32, t.array), i[222] = n(t.uint16, t.map), i[223] = n(t.uint32, t.map), e = 224; e <= 255; e++) i[e] = a(e - 256);
                    return i
                }

                function a(t) {
                    return function() {
                        return t
                    }
                }

                function n(t, e) {
                    return function(i) {
                        var r = t(i);
                        return e(i, r)
                    }
                }

                function o(t, e) {
                    return function(i) {
                        return e(i, t)
                    }
                }
                e.getReadToken = function(t) {
                    var e = r.getReadFormat(t);
                    return t && t.useraw ? function(t) {
                        var e, i = s(t).slice();
                        for (i[217] = i[196], i[218] = i[197], i[219] = i[198], e = 160; e <= 191; e++) i[e] = o(e - 160, t.bin);
                        return i
                    }(e) : s(e)
                }
            },
            9339: (t, e, i) => {
                var r = i(7386).S,
                    s = i(7754),
                    a = i(1885),
                    n = i(8551);

                function o() {
                    var t = this.options;
                    return this.encode = function(t) {
                        var e = a.getWriteType(t);
                        return function(t, i) {
                            var r = e[typeof i];
                            if (!r) throw new Error('Unsupported type "' + typeof i + '": ' + i);
                            r(t, i)
                        }
                    }(t), t && t.preset && s.setExtPackers(this), this
                }
                n.install({
                    addExtPacker: function(t, e, i) {
                        i = n.filter(i);
                        var s = e.name;
                        if (s && 'Object' !== s) {
                            (this.extPackers || (this.extPackers = {}))[s] = a
                        } else {
                            (this.extEncoderList || (this.extEncoderList = [])).unshift([e, a])
                        }

                        function a(e) {
                            return i && (e = i(e)), new r(e, t)
                        }
                    },
                    getExtPacker: function(t) {
                        var e = this.extPackers || (this.extPackers = {}),
                            i = t.constructor,
                            r = i && i.name && e[i.name];
                        if (r) return r;
                        for (var s = this.extEncoderList || (this.extEncoderList = []), a = s.length, n = 0; n < a; n++) {
                            var o = s[n];
                            if (i === o[0]) return o[1]
                        }
                    },
                    init: o
                }), e.preset = o.call(n.preset)
            },
            1868: (t, e, i) => {
                var r = i(8898),
                    s = i(7137),
                    a = s.Uint64BE,
                    n = s.Int64BE,
                    o = i(6685).w,
                    h = i(8918),
                    c = h.global,
                    l = h.hasBuffer && 'TYPED_ARRAY_SUPPORT' in c && !c.TYPED_ARRAY_SUPPORT,
                    d = h.hasBuffer && c.prototype || {};

                function u() {
                    var t = o.slice();
                    return t[196] = f(196), t[197] = p(197), t[198] = m(198), t[199] = f(199), t[200] = p(200), t[201] = m(201), t[202] = y(202, 4, d.writeFloatBE || x, !0), t[203] = y(203, 8, d.writeDoubleBE || g, !0), t[204] = f(204), t[205] = p(205), t[206] = m(206), t[207] = y(207, 8, v), t[208] = f(208), t[209] = p(209), t[210] = m(210), t[211] = y(211, 8, w), t[217] = f(217), t[218] = p(218), t[219] = m(219), t[220] = p(220), t[221] = m(221), t[222] = p(222), t[223] = m(223), t
                }

                function f(t) {
                    return function(e, i) {
                        var r = e.reserve(2),
                            s = e.buffer;
                        s[r++] = t, s[r] = i
                    }
                }

                function p(t) {
                    return function(e, i) {
                        var r = e.reserve(3),
                            s = e.buffer;
                        s[r++] = t, s[r++] = i >>> 8, s[r] = i
                    }
                }

                function m(t) {
                    return function(e, i) {
                        var r = e.reserve(5),
                            s = e.buffer;
                        s[r++] = t, s[r++] = i >>> 24, s[r++] = i >>> 16, s[r++] = i >>> 8, s[r] = i
                    }
                }

                function y(t, e, i, r) {
                    return function(s, a) {
                        var n = s.reserve(e + 1);
                        s.buffer[n++] = t, i.call(s.buffer, a, n, r)
                    }
                }

                function v(t, e) {
                    new a(this, e, t)
                }

                function w(t, e) {
                    new n(this, e, t)
                }

                function x(t, e) {
                    r.write(this, t, e, !1, 23, 4)
                }

                function g(t, e) {
                    r.write(this, t, e, !1, 52, 8)
                }
                e.getWriteToken = function(t) {
                    return t && t.uint8array ? ((e = u())[202] = y(202, 4, x), e[203] = y(203, 8, g), e) : l || h.hasBuffer && t && t.safe ? function() {
                        var t = o.slice();
                        return t[196] = y(196, 1, c.prototype.writeUInt8), t[197] = y(197, 2, c.prototype.writeUInt16BE), t[198] = y(198, 4, c.prototype.writeUInt32BE), t[199] = y(199, 1, c.prototype.writeUInt8), t[200] = y(200, 2, c.prototype.writeUInt16BE), t[201] = y(201, 4, c.prototype.writeUInt32BE), t[202] = y(202, 4, c.prototype.writeFloatBE), t[203] = y(203, 8, c.prototype.writeDoubleBE), t[204] = y(204, 1, c.prototype.writeUInt8), t[205] = y(205, 2, c.prototype.writeUInt16BE), t[206] = y(206, 4, c.prototype.writeUInt32BE), t[207] = y(207, 8, v), t[208] = y(208, 1, c.prototype.writeInt8), t[209] = y(209, 2, c.prototype.writeInt16BE), t[210] = y(210, 4, c.prototype.writeInt32BE), t[211] = y(211, 8, w), t[217] = y(217, 1, c.prototype.writeUInt8), t[218] = y(218, 2, c.prototype.writeUInt16BE), t[219] = y(219, 4, c.prototype.writeUInt32BE), t[220] = y(220, 2, c.prototype.writeUInt16BE), t[221] = y(221, 4, c.prototype.writeUInt32BE), t[222] = y(222, 2, c.prototype.writeUInt16BE), t[223] = y(223, 4, c.prototype.writeUInt32BE), t
                    }() : u();
                    var e
                }
            },
            1885: (t, e, i) => {
                var r = i(5182),
                    s = i(7137),
                    a = s.Uint64BE,
                    n = s.Int64BE,
                    o = i(8918),
                    h = i(5706),
                    c = i(1868),
                    l = i(6685).w,
                    d = i(7386).S,
                    u = 'undefined' != typeof Uint8Array,
                    f = 'undefined' != typeof Map,
                    p = [];
                p[1] = 212, p[2] = 213, p[4] = 214, p[8] = 215, p[16] = 216, e.getWriteType = function(t) {
                    var e = c.getWriteToken(t),
                        i = t && t.useraw,
                        s = u && t && t.binarraybuffer,
                        m = s ? o.isArrayBuffer : o.isBuffer,
                        y = s ? function(t, e) {
                            g(t, new Uint8Array(e))
                        } : g,
                        v = f && t && t.usemap ? function(t, i) {
                            if (!(i instanceof Map)) return b(t, i);
                            var r = i.size;
                            e[r < 16 ? 128 + r : r <= 65535 ? 222 : 223](t, r);
                            var s = t.codec.encode;
                            i.forEach((function(e, i, r) {
                                s(t, i), s(t, e)
                            }))
                        } : b;
                    return {
                        boolean: function(t, i) {
                            e[i ? 195 : 194](t, i)
                        },
                        function: x,
                        number: function(t, i) {
                            var r, s = 0 | i;
                            if (i !== s) return void e[r = 203](t, i);
                            r = -32 <= s && s <= 127 ? 255 & s : 0 <= s ? s <= 255 ? 204 : s <= 65535 ? 205 : 206 : -128 <= s ? 208 : -32768 <= s ? 209 : 210;
                            e[r](t, s)
                        },
                        object: i ? function(t, i) {
                            if (m(i)) return function(t, i) {
                                var r = i.length;
                                e[r < 32 ? 160 + r : r <= 65535 ? 218 : 219](t, r), t.send(i)
                            }(t, i);
                            w(t, i)
                        } : w,
                        string: function(t) {
                            return i;

                            function i(i, r) {
                                var s = r.length,
                                    a = 5 + 3 * s;
                                i.offset = i.reserve(a);
                                var n = i.buffer,
                                    o = t(s),
                                    c = i.offset + o;
                                s = h.write.call(n, r, c);
                                var l = t(s);
                                if (o !== l) {
                                    var d = c + l - o,
                                        u = c + s;
                                    h.copy.call(n, n, d, c, u)
                                }
                                e[1 === l ? 160 + s : l <= 3 ? 215 + l : 219](i, s), i.offset += s
                            }
                        }(i ? function(t) {
                            return t < 32 ? 1 : t <= 65535 ? 3 : 5
                        } : function(t) {
                            return t < 32 ? 1 : t <= 255 ? 2 : t <= 65535 ? 3 : 5
                        }),
                        symbol: x,
                        undefined: x
                    };

                    function w(t, i) {
                        if (null === i) return x(t, i);
                        if (m(i)) return y(t, i);
                        if (r(i)) return function(t, i) {
                            var r = i.length;
                            e[r < 16 ? 144 + r : r <= 65535 ? 220 : 221](t, r);
                            for (var s = t.codec.encode, a = 0; a < r; a++) s(t, i[a])
                        }(t, i);
                        if (a.isUint64BE(i)) return function(t, i) {
                            e[207](t, i.toArray())
                        }(t, i);
                        if (n.isInt64BE(i)) return function(t, i) {
                            e[211](t, i.toArray())
                        }(t, i);
                        var s = t.codec.getExtPacker(i);
                        if (s && (i = s(i)), i instanceof d) return function(t, i) {
                            var r = i.buffer,
                                s = r.length,
                                a = p[s] || (s < 255 ? 199 : s <= 65535 ? 200 : 201);
                            e[a](t, s), l[i.type](t), t.send(r)
                        }(t, i);
                        v(t, i)
                    }

                    function x(t, i) {
                        e[192](t, i)
                    }

                    function g(t, i) {
                        var r = i.length;
                        e[r < 255 ? 196 : r <= 65535 ? 197 : 198](t, r), t.send(i)
                    }

                    function b(t, i) {
                        var r = Object.keys(i),
                            s = r.length;
                        e[s < 16 ? 128 + s : s <= 65535 ? 222 : 223](t, s);
                        var a = t.codec.encode;
                        r.forEach((function(e) {
                            a(t, e), a(t, i[e])
                        }))
                    }
                }
            },
            6685: (t, e) => {
                for (var i = e.w = new Array(256), r = 0; r <= 255; r++) i[r] = s(r);

                function s(t) {
                    return function(e) {
                        var i = e.reserve(1);
                        e.buffer[i] = t
                    }
                }
            },
            1465: t => {
                t.exports = 'body.hide-news #newsHolder,body.hide-security #onetrust-consent-sdk,body.hide-merch #merchHolder,body.hide-streams #streamContainer,body.hide-adverts #aContainer,body.hide-adverts #aHolder,body.hide-adverts #endAContainer,body.hide-adverts #aMerger{display:none!important}'
            },
            6605: t => {
                t.exports = '*{outline:none}.content.invalid .name{color:#f04747}.content{display:flex;--size-big: 24px;--size-small: 16px}.info{flex:1 1 auto;min-width:1px;flex-direction:column;flex-wrap:nowrap;display:flex;align-items:stretch;justify-content:center;text-indent:0}.icon{background:#36393f center / cover;margin-right:16px;width:65px;height:65px;border-radius:16px;text-align:center;color:#dcddde;position:relative}.name{min-width:0px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;align-items:center;display:flex;color:#FFF;margin-bottom:2px;font-size:var(--size-big)}.join{text-decoration:none;margin-left:auto;white-space:nowrap;border-radius:3px;font-size:var(--size-small);padding:0px 20px;user-select:none;color:#FFF;background:#3ba55d;cursor:pointer;align-items:center;display:flex}.status{display:flex;align-items:center;margin-left:16px;color:#b9bbbe;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;font-size:var(--size-small);white-space:pre-wrap}.status::before{content:\'\';display:inline-block;margin-right:4px;width:8px;height:8px;border-radius:50%}.status.online::before{background:#43b581}.status.total::after{content:\' Members\'}.status.online::after{content:\' Online\'}.status.total::before{background:#747f8d}.content.invalid .status{display:none}'
            }
        },
        e = {};

    function i(r) {
        if (e[r]) return e[r].exports;
        var s = e[r] = {
            exports: {}
        };
        return t[r].call(s.exports, s, s.exports, i), s.exports
    }(() => {
        'use strict';
        var {
            krunker: t
        } = i(9606);
        t && i(2220)
    })()
})();