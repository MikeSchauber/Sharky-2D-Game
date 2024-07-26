class WorldMusic {
    musicVolume;
    effectVolume;
    ambient_sound;
    coin_sound;
    poison_collect_sound;
    poison_bubbleshot_sound;
    electrodeath_sound;
    walking_sound;
    electro_hitsound;
    error_sound;
    bubble_shot;
    ouch_sound;
    snoring_sound;
    punch_sound;
    boss_laugh_sound;
    boss_music;
    bite_sound;
    boss_hurt_sound;
    boss_death_sound;
    win_sound;
    gameover_sound;
    musicloop = true;

    constructor(m, e) {
        this.volumeSettings(m, e);
        this.setSounds();
    }

    volumeSettings(m, e) {
        this.musicVolume = m;
        this.effectVolume = e;
    }

    playBackgroundMusic() {
        this.ambient_sound.loop = true;
        this.ambient_sound.play();
        this.setEffectVolume();
    }

    pauseBackgroundMusic() {
        this.ambient_sound.pause();
        this.ambient_sound.loop = false;
        this.muteEffectVolume();
    }

    setSounds() {
        this.ambient_sound = new Audio("audio/ambient.mp3");
        this.coin_sound = new Audio("audio/coin.mp3");
        this.poison_collect_sound = new Audio("audio/poison.mp3");
        this.bubble_shot = new Audio("audio/bubble-shot.mp3");
        this.poison_bubbleshot_sound = new Audio("audio/poison-bubble.mp3");
        this.walking_sound = new Audio("audio/swim Sound.mp3");
        this.electro_hitsound = new Audio("audio/electro-damage.mp3");
        this.error_sound = new Audio("audio/error.mp3");
        this.ouch_sound = new Audio("audio/ouch.mp3");
        this.electrodeath_sound = new Audio("audio/bones.mp3");
        this.snoring_sound = new Audio("audio/snoring.mp3");
        this.punch_sound = new Audio("audio/punch.mp3");
        this.boss_laugh_sound = new Audio("audio/boss-laugh.mp3");
        this.boss_music = new Audio("audio/boss-music.mp3");
        this.bite_sound = new Audio("audio/bite.mp3");
        this.boss_hurt_sound = new Audio("audio/boss-hurt.mp3");
        this.boss_death_sound = new Audio("audio/death.mp3");
        this.win_sound = new Audio("audio/win.mp3");
        this.gameover_sound = new Audio("audio/gameover.mp3");
    }

    setEffectVolume() {
        this.ambient_sound.volume = this.musicVolume;
        this.boss_music.volume = this.musicVolume;
        this.coin_sound.volume = this.effectVolume;
        this.walking_sound.volume = this.effectVolume;
        this.electro_hitsound.volume = this.effectVolume;
        this.bubble_shot.volume = this.effectVolume;
        this.poison_bubbleshot_sound.volume = this.effectVolume;
        this.poison_collect_sound.volume = this.effectVolume;
        this.ouch_sound.volume = this.effectVolume;
        this.electrodeath_sound.volume = this.effectVolume;
        this.snoring_sound.volume = this.effectVolume;
        this.error_sound.volume = this.effectVolume;
        this.punch_sound.volume = this.effectVolume;
        this.boss_laugh_sound.volume = this.effectVolume;
        this.bite_sound.volume = this.effectVolume;
        this.boss_hurt_sound.volume = this.effectVolume;
        this.boss_death_sound.volume = this.effectVolume;
        this.win_sound.volume = this.musicVolume;
        this.gameover_sound.volume = this.musicVolume;
    }

    muteEffectVolume() {
        this.boss_music.volume = 0;
        this.coin_sound.volume = 0;
        this.walking_sound.volume = 0;
        this.electro_hitsound.volume = 0;
        this.bubble_shot.volume = 0;
        this.poison_bubbleshot_sound.volume = 0;
        this.poison_collect_sound.volume = 0;
        this.ouch_sound.volume = 0;
        this.electrodeath_sound.volume = 0;
        this.snoring_sound.volume = 0;
        this.error_sound.volume = 0;
        this.punch_sound.volume = 0;
        this.boss_laugh_sound.volume = 0;
        this.bite_sound.volume = 0;
        this.boss_hurt_sound.volume = 0;
        this.boss_death_sound.volume = 0;
        this.win_sound.volume = 0;
        this.gameover_sound.volume = 0;
    }
}