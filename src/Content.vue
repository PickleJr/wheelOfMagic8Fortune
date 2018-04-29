<template lang="pug">
.container
    .row
        div(class="input-field col s12")
            i(class="material-icons prefix") question_answer
            input(id="question" type="text" v-model="inputQuestion" class="validate")
            label(for="question") Ask Wheel of 8 Ball a yes or no question
    .row
        div(class="col s12 center")
            p.flow-text Magic 8 Wheel, {{ question }}?
    .row
        .center
            button(id="askButton" v-bind:class="animateAskButton" v-on:click="showWheel" class="btn waves-effect waves-light btn-large" ) Ask!
    .row
        .center(v-bind:class="animateWheel" id="spinWheel")
            i(class="material-icons large") arrow_downward
            br
            canvas(id="canvas" width="434" height="434") Canvas not supported, use another browser.
    .row
        .center(id="answer" v-bind:class="animateAnswer")
            p.flow-text {{ answer }}
            br
            button(id="resetButton" v-on:click="resetQuestion" class="btn waves-effect waves-light btn-large") Ask another question!
</template>


<script>
export default {
    data: () => {
        return {
            inputQuestion: '',
            answer: '',
            animateAskButton: {
                hide: true,
                animated: false,
                fadeInUpBig: false,
                fadeOutDownBig: false
            },
            animateWheel: {
                hide: true,
                animated: false,
                fadeInUpBig: false,
                fadeOutDownBig: false
            },
            animateAnswer: {
                hide: true,
                animated: false,
                fadeInUpBig: false,
                fadeOutDownBig: false
            }
        }
    },
    computed: {
        question() {
            return (this.inputQuestion.length > 0) ? this.inputQuestion : '_____';
        },
    },
    watch: {
        inputQuestion(newQuestion, oldQuestion) {
            if(oldQuestion.length === 0 && newQuestion.length > 0) {
                this.animateAskButton.hide = false;
                this.animateAskButton.animated = true;
                this.animateAskButton.fadeInUpBig = true;
            } else if(oldQuestion.length > 0 && newQuestion.length === 0) {
                this.animateAskButton.animated = false;
                this.animateAskButton.fadeOutDownBig = false;
                this.animateAskButton.fadeInUpBig = false;
                this.animateAskButton.hide = true;
                this.animateWheel.hide = true;
                this.animateWheel.animated = false;
                this.animateWheel.fadeInUpBig = false;
                this.animateWheel.fadeOutDownBig = false;
                if(this.wheelSpinning) {
                    this.resetWheel();
                }
                this.animateAnswer.hide = true;
                this.animateAnswer.animated = false;
                this.animateAnswer.fadeInUpBig = false;
                this.animateAnswer.fadeOutDownBig = false;
                if(this.answer.length > 0) {
                    this.answer = '';
                }
            }
        }
    },
    mounted() {
        this.theWheel = new Winwheel({
            'numSegments': 8,
            'outerRadius': 212,
            'centerX': 217,
            'centerY': 219,
            'textFontSize': 28,
            'segments': [
                {'fillStyle': '#eae56f', 'text': 'Prize 1'},
                {'fillStyle': '#89f26e', 'text': 'Prize 2'},
                {'fillStyle': '#7de6ef', 'text': 'Prize 3'},
                {'fillStyle': '#e7706f', 'text': 'Prize 4'},
                {'fillStyle': '#eae56f', 'text': 'Prize 5'},
                {'fillStyle': '#89f26e', 'text': 'Prize 6'},
                {'fillStyle': '#7de6ef', 'text': 'Prize 7'},
                {'fillStyle': '#e7706f', 'text': 'Prize 8'},
            ],
            'animation': {
                'type': 'spinToStop',
                'duration': 5,
                'spins': 15,
                'callbackFinished': this.alertPrize
            }
        });
        this.wheelSpinning = false;

        //document.querySelector("#askButton").addEventListener("animationend", this.askButtonAnimationStoped);
        document.querySelector("#spinWheel").addEventListener("animationend", this.spinWheel);
    },
    methods: {
        askButtonAnimationStoped() {
            if(this.animateAskButton.fadeInUpBig) {
                this.animateAskButton.fadeInUpBig = false;
                this.animateAskButton.animated = false;
            } else if (this.animateAskButton.fadeOutDownBig) {
                this.animateAskButton.animated = false;
                this.animateAskButton.fadeOutDownBig = false;
                this.animateAskButton.hide = true;
            }
        },
        spinWheel() {
            if(this.animateWheel.fadeInUpBig) {
                this.animateWheel.animated = false;
                this.animateWheel.fadeInUpBig = false;
                if(!this.wheelSpinning) {
                    this.theWheel.startAnimation();
                    this.wheelSpinning = true;
                }
            }
        },
        showWheel() {
            this.animateWheel.hide = false;
            this.animateWheel.animated = true;
            this.animateWheel.fadeInUpBig = true;
        },
        alertPrize(indicatedSegment) {
            this.answer = indicatedSegment.text;
            this.showAnswer();
        },
        resetWheel() {
            this.theWheel.stopAnimation(false);
            this.answer = '';
            this.theWheel.rotationAngle = 0;
            this.theWheel.draw();
            this.wheelSpinning = false;
        },
        showAnswer() {
            this.animateAnswer.hide = false;
            this.animateAnswer.animated = true;
            this.animateAnswer.fadeInUpBig = true;
        },
        resetQuestion() {
            this.inputQuestion = '';
        }
    }
}
</script>