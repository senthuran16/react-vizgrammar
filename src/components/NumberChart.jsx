/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryLabel } from 'victory';
import VizGError from '../VizGError';
import lightTheme from './resources/themes/victoryLightTheme';
import darkTheme from './resources/themes/victoryDarkTheme';

/**
 * Class to handle visualization of Number Charts.
 */
export default class NumberCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            prevValue: null,
        };
    }

    componentDidMount() {
        if (this.props.metadata !== null) {
            this._handleData(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.metadata !== null) {
            this._handleData(nextProps);
        }
    }

    /**
     * handles data received by the props
     * @param props
     * @private
     */
    _handleData(props) {
        const { config, data, metadata } = props;
        let { prevValue, value } = this.state;
        const xIndex = metadata.names.indexOf(config.x);

        if (xIndex === -1) {
            throw new VizGError('MapChart', "Unknown 'x' field defined in the Number Chart config.");
        }

        if (data.length > 0) {
            prevValue = value;
            value = data[data.length - 1][xIndex];
        }

        this.setState({ value, prevValue });
    }

    render() {
        const { config, width, height, theme } = this.props;
        const currentTheme = theme === 'light' ? lightTheme : darkTheme;
        const { prevValue, value } = this.state;
        const highValueColor = config.highValueColor || currentTheme.number.style.labels.highValue.fill;
        const lowValueColor = config.lowValueColor || currentTheme.number.style.labels.lowValue.fill;

        return (
            <svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
                <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    x="50%"
                    y="25%"
                    text={config.title}
                    style={{ fill: currentTheme.number.style.labels.title.fill, fontSize: width / 20 }}
                />
                <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    x="50%"
                    y="40%"
                    text={(value === null ? value : value.toFixed(3))}
                    style={{ fill: currentTheme.number.style.labels.mainValue.fill, fontSize: width / 15 }}
                />
                {
                    config.showDifference ? [
                        (<VictoryLabel
                            textAnchor="middle"
                            verticalAnchor="middle"
                            x="56%"
                            y="49.6%"
                            text={(() => {
                                if (prevValue < value) {
                                    return '+';
                                } else if (prevValue === value) {
                                    return '';
                                } else {
                                    return '-';
                                }
                            })()}
                            style={{ fill: currentTheme.number.style.labels.difference.fill, fontSize: width / 30 }}
                        />),
                        (
                            <VictoryLabel
                                textAnchor="middle"
                                verticalAnchor="middle"
                                x="50%"
                                y="50%"
                                text={(Math.abs(Number((prevValue - value)))).toFixed(3)}
                                style={{ fill: currentTheme.number.style.labels.difference.fill, fontSize: width / 30 }}
                            />
                        )] : null
                }
                {
                    config.showPercentage ? [
                        (<VictoryLabel
                            key="percentVal"
                            textAnchor="middle"
                            verticalAnchor="middle"
                            x="49%"
                            y="58%"
                            text={(Math.abs((100 * ((value - prevValue) / prevValue))).toFixed(2)) + '%'}
                            style={{ fill: prevValue < value ? highValueColor : lowValueColor, fontSize: width / 30 }}
                        />),
                        (<VictoryLabel
                            key="incrementDecrementSymbol"
                            textAnchor="middle"
                            verticalAnchor="middle"
                            x="58%"
                            y="57.4%"
                            text={(() => {
                                if (prevValue < value) {
                                    return '↑';
                                } else if (prevValue === value) {
                                    return '';
                                } else {
                                    return '↓';
                                }
                            })()}
                            style={{ fill: prevValue < value ? highValueColor : lowValueColor, fontSize: width / 30 }}
                        />)] : null
                }

            </svg>
        );
    }
}

NumberCharts.propTypes = {
    config: PropTypes.shape({
        x: PropTypes.string,
        title: PropTypes.string,
        charts: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
        })),
        showDifference: PropTypes.bool,
        showPercentage: PropTypes.bool,
    }).isRequired,
    metadata: PropTypes.shape({
        names: PropTypes.arrayOf(PropTypes.string),
        types: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    data: PropTypes.array,
    height: PropTypes.number,
    width: PropTypes.number,
};

NumberCharts.defaultProps = {
    height: 450,
    width: 800,
    data: [],
};
