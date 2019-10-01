<template>
  <div>
    <v-stage ref="stage" :config="stageSize">
      <v-layer>
        <v-line ref="hexagon" v-for="(item, index) in VerticalLines" :key="index" :config="item"/>
      </v-layer>
      <v-layer>
        <v-line v-for="(item, index) in HorizontalLines" :key="index" :config="item"/>
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: {
    _blocksMaxCount: {
      type: Number,
      default: 0
    },
    _scenarioCount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      stageSize: null,
      VerticalLines: [],
      HorizontalLines: [],
      labelConf: {},
      stage: null,
      stageConf: null,
      layer: null,
      tagConf: {
        fill: "#828282",
        pointerWidth: 10,
        pointerHeight: 10,
        lineJoin: "round",
        shadowColor: "black",
        shadowBlur: 0,
        shadowOpacity: 0
      },
      tooltip: null,
      labelsArray: ["Output scenario"],
      linesArrayHor: [],
      linesArrayVer: []
    };
  },
  methods: {
    getWidthOfVerticalLines() {
      const width = this.width / this._blocksMaxCount;
      return width < 150 ? 150 : width;
    },
    getHeightOfHorizontalLines() {
      const height = this.height / this._scenarioCount;
      return height < 150 ? 150 : height;
    },
    getModelWidth() {
      this.width = window.innerWidth - 15;
    },
    getModelHeight() {
      this.height = window.innerHeight - 35;
    },
    init() {
      this.stageSize = {
        width: this.width,
        height: this.height
      };
      for (let i = 1; i <= this._scenarioCount; i++) {
        this.labelsArray.push("Scenario " + i);
      }
    },
    getVerticalLines() {
      if (this.linesArrayVer.length > 0) {
        this.linesArrayVer.forEach(element => {
          if (element < 0) element = 0;
          this.VerticalLines.push({
            x: element,
            y: 0,
            points: [0, 0, 0, this.height],
            tension: 1,
            closed: false,
            stroke: "#666",
            strokeWidth: 3,
            lineCap: "round",
            lineJoin: "round",
            dash: [5, 10]
          });
        });
      } else {
        const widthSize = this.getWidthOfVerticalLines();
        for (let i = widthSize; i < this.width; i += widthSize) {
          this.VerticalLines.push({
            x: i,
            y: 0,
            points: [0, 0, 0, this.height],
            tension: 1,
            closed: false,
            stroke: "#666",
            strokeWidth: 3,
            lineCap: "round",
            lineJoin: "round",
            dash: [5, 10]
          });
        }
      }
    },
    getHorizontalLines() {
      if (this.linesArrayHor.length > 0) {
        this.linesArrayHor.forEach(element => {
          if (element < 0) element = 0;
          this.HorizontalLines.push({
            x: 0,
            y: element,
            points: [0, 0, this.width, 0],
            tension: 1,
            closed: false,
            stroke: "#666",
            strokeWidth: 3,
            lineCap: "round",
            lineJoin: "round",
            dash: [5, 10]
          });
        });
      } else {
        const heightSize = this.getHeightOfHorizontalLines();
        for (let i = heightSize; i < this.height; i += heightSize) {
          this.HorizontalLines.push({
            x: 0,
            y: i,
            points: [0, 0, this.width, 0],
            tension: 1,
            closed: false,
            stroke: "#666",
            strokeWidth: 3,
            lineCap: "round",
            lineJoin: "round",
            dash: [5, 10]
          });
        }
      }
    },
    createHorizontalLabels() {
      if (this.linesArrayHor.length > 0) {
        this.linesArrayHor.forEach((element, index) => {
          if (element < 0) element = 0;
          this.tooltip = new Konva.Label({
            x: 0,
            y: element + 5,
            opacity: 1
          });

          this.tooltip.add(new Konva.Tag(this.tagConf));

          this.tooltip.add(
            new Konva.Text({
              text: this.labelsArray[index],
              fontFamily: "Calibri",
              fontSize: 18,
              padding: 2,
              fill: "white"
            })
          );

          this.layer.add(this.tooltip);
        });
      } else {
        const countHorizontalLines = this.getHeightOfHorizontalLines();
        for (
          let i = 0, index = 0;
          i < this.height;
          i += countHorizontalLines, index++
        ) {
          this.tooltip = new Konva.Label({
            x: 0,
            y: i + 5,
            opacity: 1
          });

          this.tooltip.add(new Konva.Tag(this.tagConf));

          this.tooltip.add(
            new Konva.Text({
              text: this.labelsArray[index],
              fontFamily: "Calibri",
              fontSize: 18,
              padding: 2,
              fill: "white"
            })
          );

          this.layer.add(this.tooltip);
        }
      }
    },
    createVerticalLabels() {
      if (this.linesArrayVer.length > 0) {
        this.linesArrayVer.forEach((element, index) => {
          if (element < 0) element = 0;
          this.tooltip = new Konva.Label({
            x: element + 5,
            y: 5,
            opacity: 1
          });

          this.tooltip.add(new Konva.Tag(this.tagConf));

          this.tooltip.add(
            new Konva.Text({
              text: "Coll " + index,
              fontFamily: "Calibri",
              fontSize: 18,
              padding: 2,
              fill: "white"
            })
          );

          this.layer.add(this.tooltip);
        });
      } else {
        const countVerticalLines = this.getWidthOfVerticalLines();
        for (
          let i = countVerticalLines, index = 1;
          i < this.width;
          i += countVerticalLines, index++
        ) {
          this.tooltip = new Konva.Label({
            x: i + 5,
            y: 5,
            opacity: 1
          });

          this.tooltip.add(new Konva.Tag(this.tagConf));

          this.tooltip.add(
            new Konva.Text({
              text: "Coll " + index,
              fontFamily: "Calibri",
              fontSize: 18,
              padding: 2,
              fill: "white"
            })
          );

          this.layer.add(this.tooltip);
        }
      }
    },
    renderLines() {
      this.getVerticalLines();
      this.getHorizontalLines();

      this.stage = this.$refs.stage.getStage();
      this.layer = new Konva.Layer();
      // cretate labels on layer
      this.createHorizontalLabels();
      this.createVerticalLabels();
      // add layer to the stage
      this.stage.add(this.layer);
    }
  },
  created() {
    this.getModelWidth();
    this.getModelHeight();
    this.init();
  },
  mounted() {
    const url = `https://localhost:44346/SoundLogParser/TestMethod/99/183`;

    let self = this;

    axios
      .get(url, {})
      .then(response => {
        console.log(response.data);
        if (response.data.blockWeights.length > 0) {
          self.linesArrayVer = response.data.blockWeights;
          const width =
            response.data.blockWeights[response.data.blockWeights.length - 1];
          self.width = width;
          self.stageSize.width = width;
        }
        if (response.data.blockHeights.length > 0) {
          self.linesArrayHor = response.data.blockHeights;
          const height =
            response.data.blockHeights[response.data.blockHeights.length - 1];
          self.height = height;
          self.stageSize.height = height;
        }
        self.renderLines();
      })
      .catch(e => {
        console.error(e);
        self.renderLines();
      });
  }
};
</script>