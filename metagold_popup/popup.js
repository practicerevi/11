const popupSlot = document.querySelector(".popup-slot");
const openButton = document.querySelector(".popup-slot-open");
const closeButton = document.querySelector(".popup-slot-close");
const mainOverlay = document.querySelector(".main-overlay");
const slotList = document.querySelectorAll(".slot-list-item");
const PopupPlay = document.querySelectorAll(".popup_play");

openButton.addEventListener("click", function () {
    document.body.style.overflow = "hidden";
    popupSlot.classList.add("open");
    popupSlot.style.display = "flex";
    mainOverlay.style.display = "block";
});

closeButton.addEventListener("click", function (event) {
    event.stopPropagation();
    document.body.style.overflow = "auto";
    popupSlot.style.display = "none";
    mainOverlay.style.display = "none";

    // 클로즈버튼을 눌렀다 다시키면 PopupPlay가 활성화가 되어있어,
    // 닫히면 PopupPlay가 비활성화되게함
    PopupPlay.forEach(function (playItem) {
        playItem.style.display = "none";
    });
});

slotList.forEach(function (item, index) {
    item.addEventListener("click", function (event) {
        event.stopPropagation(); // 부모로의 이벤트 전파 방지

        PopupPlay.forEach(function (playItem) {
            playItem.style.display = "none";
            playItem.classList.remove("open");
        });

        PopupPlay[index].style.display = "block";
        PopupPlay[index].classList.add("open");
    });
});

document.addEventListener("click", function (event) {
    // 클릭된 엘리먼트가 팝업이 아닌 경우에만 팝업을 닫기
    if (!event.target.closest(".popup_play")) {
        PopupPlay.forEach(function (playItem) {
            playItem.style.display = "none";
            playItem.classList.remove("open");
        });
    }
});

// Add event listener to each PopupPlay
PopupPlay.forEach(function (playItem, index) {
    playItem.addEventListener("click", function (event) {
        // 여기에서 해당 인덱스의 popup_play_btn을 실행
        const popupPlayBtns = document.querySelectorAll(".popup_play_btn");
        const targetPopupPlayBtn = popupPlayBtns[index];

        if (targetPopupPlayBtn) {
            // 해당 인덱스의 popup_play_btn을 클릭하는 시뮬레이션
            targetPopupPlayBtn.click();
        }
    });
});
