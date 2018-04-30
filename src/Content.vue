<template lang="pug">
.container
    .row
        div(class="input-field col s12")
            i(class="material-icons prefix") question_answer
            input(id="question" v-on:keypress.enter="showWheel" type="text" v-model="inputQuestion" class="validate")
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
            canvas(id="canvas" width="500" height="500") Canvas not supported, use another browser.
    .row
        .center(id="answer" v-bind:class="animateAnswer")
            p.flow-text Magic 8 Wheel says, "{{ answer }}."
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
                fadeOutDownBig: false,
                disabled: false
            },
            askButtonReady: true,
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
            if(oldQuestion.length === 0 && newQuestion.length > 0 && this.askButtonReady) {
                this.animateAskButton.hide = false;
                this.animateAskButton.animated = true;
                this.animateAskButton.fadeInUpBig = true;
                this.askButtonReady = false;
            }
            else if(oldQuestion.length === 0 && newQuestion.length > 0 && !this.askButtonReady) {
                this.animateAskButton.hide = false;
                this.animateAskButton.animated = false;
                this.animateAskButton.fadeInUpBig = false;
                this.animateAskButton.fadeOutDownBig = false;
                this.animateAskButton.disabled = false;
                this.askButtonReady = true;
            } else if(oldQuestion.length > 0 && newQuestion.length === 0) {
                this.animateAskButton.disabled = false;
                if(this.askButtonReady) {
                    this.animateAskButton.animated = true;
                    this.animateAskButton.fadeOutDownBig = true;
                    this.askButtonReady = false;
                } else {
                    this.animateAskButton.animated = false;
                    this.animateAskButton.fadeOutDownBig = false;
                    this.animateAskButton.fadeInUpBig = false;
                    this.animateAskButton.hide = true;
                    this.askButtonReady = true;
                }
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
            'numSegments': 20,
            'outerRadius': 250,
            'centerX': 250,
            'centerY': 250,
            'textFontSize': 16,
            'segments': [
                {'fillStyle': '#eae56f', 'text': 'It is certain'},
                {'fillStyle': '#89f26e', 'text': 'Reply hazy try again'},
                {'fillStyle': '#7de6ef', 'text': 'It is decidedly so'},
                {'fillStyle': '#e7706f', 'text': 'Don\'t count on it'},
                {'fillStyle': '#eae56f', 'text': 'Ask again later'},
                {'fillStyle': '#89f26e', 'text': 'Without a doubt'},
                {'fillStyle': '#7de6ef', 'text': 'My reply is no'},
                {'fillStyle': '#e7706f', 'text': 'Yes definitely'},
                {'fillStyle': '#eae56f', 'text': 'Better not tell you now'},
                {'fillStyle': '#89f26e', 'text': 'You may rely on it'},
                {'fillStyle': '#7de6ef', 'text': 'My sources say no'},
                {'fillStyle': '#e7706f', 'text': 'As I see it, yes'},
                {'fillStyle': '#eae56f', 'text': 'Cannot predict'},
                {'fillStyle': '#89f26e', 'text': 'Most likely'},
                {'fillStyle': '#7de6ef', 'text': 'Outlook not so good'},
                {'fillStyle': '#e7706f', 'text': 'Outlook good'},
                {'fillStyle': '#eae56f', 'text': 'Concentrate and ask again'},
                {'fillStyle': '#89f26e', 'text': 'Yes'},
                {'fillStyle': '#7de6ef', 'text': 'Very doubtful'},
                {'fillStyle': '#e7706f', 'text': 'Signs point to yes'},
            ],
            'animation': {
                'type': 'spinToStop',
                'duration': 5,
                'spins': 15,
                'callbackFinished': this.alertPrize
            }
        });
        this.wheelSpinning = false;

        document.querySelector("#askButton").addEventListener("animationend", this.askButtonAnimationStoped);
        document.querySelector("#spinWheel").addEventListener("animationend", this.spinWheel);
        document.querySelector("#answer").addEventListener("animationend", this.scrollToAnswer);

        document.querySelector("#askButton").addEventListener("oAnimationEnd", this.askButtonAnimationStoped);
        document.querySelector("#spinWheel").addEventListener("oAnimationEnd", this.spinWheel);
        document.querySelector("#answer").addEventListener("oAnimationEnd", this.scrollToAnswer);

        document.querySelector("#askButton").addEventListener("mozAnimationEnd", this.askButtonAnimationStoped);
        document.querySelector("#spinWheel").addEventListener("mozAnimationEnd", this.spinWheel);
        document.querySelector("#answer").addEventListener("mozAnimationEnd", this.scrollToAnswer);

        document.querySelector("#askButton").addEventListener("webkitAnimationEnd", this.askButtonAnimationStoped);
        document.querySelector("#spinWheel").addEventListener("webkitAnimationEnd", this.spinWheel);
        document.querySelector("#answer").addEventListener("webkitAnimationEnd", this.scrollToAnswer);
    },
    methods: {
        scrollToAnswer() {
            window.scroll({
                top: document.body.scrollHeight,
                left: 0,
                behavior: 'smooth'
            });
        },
        askButtonAnimationStoped() {
            if(!this.askButtonReady) {
                if(this.animateAskButton.fadeInUpBig) {
                    this.animateAskButton.fadeInUpBig = false;
                    this.animateAskButton.animated = false;
                    this.askButtonReady = true;
                } else if (this.animateAskButton.fadeOutDownBig) {
                    this.animateAskButton.animated = false;
                    this.animateAskButton.fadeOutDownBig = false;
                    this.animateAskButton.hide = true;
                    this.askButtonReady = true;
                }
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
            if(this.inputQuestion.length > 0){
                this.animateAskButton.disabled = true;
                this.animateWheel.hide = false;
                this.animateWheel.animated = true;
                this.animateWheel.fadeInUpBig = true;
            }
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