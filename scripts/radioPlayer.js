export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const faVolumeUp = document.querySelector('.fa-volume-up.radio-icon');
    const faVolumeDown = document.querySelector('.fa-volume-down.radio-icon');
    let varTempVolume = 0;

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    }

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');
        selectItem(parrent);

        const title = parrent.querySelector('.radio-name').textContent;
        const urlImg = parrent.querySelector('.radio-img').src;

        radioHeaderBig.textContent = title;
        radioCoverImg.src = urlImg;

        audio.src = target.dataset.radioStantion;
        radioStop.disabled = false;
        audio.play();
        changeIconPlay();
    })

    radioStop.addEventListener('click', () => {
        if (audio.paused) { audio.play() } else { audio.pause() }
        changeIconPlay();
    })

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
    })

    audio.volume = 0.5;
    radioVolume.value = audio.volume * 100;

    faVolumeDown.addEventListener('click', () => {
        if ((varTempVolume < 1) && (varTempVolume > 0) && (audio.volume != 1)) {
            audio.volume = varTempVolume;
            radioVolume.value = audio.volume * 100;
            varTempVolume = 0;
        } else if (audio.volume === 1) {
            audio.volume = 0;
            radioVolume.value = 0;
        } else {
            varTempVolume = audio.volume;
            audio.volume = 0;
            radioVolume.value = 0;
        }
    })

    faVolumeUp.addEventListener('click', () => {
        if ((varTempVolume < 1) && (varTempVolume > 0) && (audio.volume != 0)) {
            audio.volume = varTempVolume;
            radioVolume.value = audio.volume * 100;
            varTempVolume = 1;
        } else if (audio.volume === 0) {
            audio.volume = 1;
            radioVolume.value = 100;
        } else {
            varTempVolume = audio.volume;
            audio.volume = 1;
            radioVolume.value = 100;
        }
    })
}