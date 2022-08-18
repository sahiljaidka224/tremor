import React from 'react';

import {
    Bar,
    CartesianGrid,
    Legend,
    BarChart as ReChartsBarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import BaseChartProps from '../common/BaseChartProps';
import ChartLegend from '../common/ChartLegend';
import ChartTooltip from '../common/ChartTooltip';

import colorTheme, { themeColorRange } from 'lib/colorTheme';
import { defaultValueFormater } from 'lib/utils';
import { getHexFromColorThemeValue } from 'lib/classnameUtils';

export interface BarChartProps extends BaseChartProps {
    layout?: string,
    stack?: boolean,
    relative?: boolean,
}

const BarChart = ({
    data,
    categories,
    dataKey,
    colors = themeColorRange,
    valueFormater = defaultValueFormater,
    layout = 'horizontal',
    stack = false,
    relative = false,
    startEndOnly = false,
    showXAxis = true,
    showYAxis = true,
    yAxisWidth,
    showTooltip = true,
    showLegend = true,
    showGridLines = true,
    height = 300,
    paddingTopPixels = 5,
    paddingRightPixels = 20,
    paddingBottomPixels = 5,
    paddingLeftPixels = 5,
}: BarChartProps) => (
    <div className="w-full" style={ { 'height': `${height}px` } }>
        <ResponsiveContainer width="100%" height="100%">
            <ReChartsBarChart
                data={ data }
                stackOffset={ relative ? 'expand' : 'none' }
                layout={ layout === 'vertical' ? 'vertical' : 'horizontal' }
                margin={{
                    top: paddingTopPixels,
                    right: paddingRightPixels,
                    left: paddingLeftPixels,
                    bottom: paddingBottomPixels,
                }}
            >
                { showGridLines ? (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        horizontal={ true }
                        vertical={ false }
                    />
                ) : null }

                { layout !== 'vertical' ? (
                    <XAxis
                        hide={ !showXAxis }
                        dataKey={ dataKey }
                        interval="preserveStartEnd"
                        tick={{ transform: 'translate(0, 6)' }} //padding between labels and axis
                        ticks={ startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined }
                        style={{
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                            marginTop: '20px',
                        }}
                        tickLine={false}
                        axisLine={false}
                    />
                ) : (
                    <XAxis
                        hide={ !showXAxis }
                        type="number"
                        tick={{ transform: 'translate(0, 6)' }} //padding between labels and axis
                        style={{
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                            marginTop: '20px',
                        }}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={ valueFormater }
                    />
                )}
                { layout !== 'vertical' ? (
                    <YAxis
                        width={ yAxisWidth }
                        hide={ !showYAxis }
                        axisLine={ false }
                        tickLine={ false }
                        type="number"
                        domain={ [0, 'auto'] }
                        tick={ { transform: 'translate(-3, 0)' } } //padding between labels and axis
                        style={ {
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                        } }
                        tickFormatter={ relative ? (value: number) => `${(value * 100).toString()} %` : valueFormater }
                    />
                ) : (
                    <YAxis
                        width={ yAxisWidth }
                        hide={ !showYAxis }
                        dataKey={ dataKey }
                        axisLine={ false }
                        tickLine={ false }
                        ticks={ startEndOnly ? [data[0][dataKey], data[data.length - 1][dataKey]] : undefined }
                        type="category"
                        interval="preserveStartEnd"
                        tick={ { transform: 'translate(10, 0)' } } 
                        style={ {
                            fontSize: '12px',
                            fontFamily: 'Inter; Helvetica',
                        } }  
                    />
                ) }

                <Tooltip
                    isAnimationActive={false}
                    cursor={ { fill: '#d1d5db', opacity: '0.15' } }
                    content={ ({ active, payload, label }) => (
                        showTooltip
                            ? (
                                <ChartTooltip
                                    active={ active }
                                    payload={ payload }
                                    label={ label }
                                    valueFormater={ valueFormater }
                                    colors={ colors }
                                />
                            )
                            : null
                    ) }
                    position={{ y: 0 }}
                />
                {
                    showLegend ? (
                        <Legend
                            verticalAlign="top"
                            height={40}
                            content={ ({ payload }) => ChartLegend({ payload }, colors) }
                        />
                    ) : null
                }
                {
                    categories.map((category, idx) => (
                        <Bar
                            key={ category }
                            name={ category }
                            type="linear"
                            stackId={ stack || relative ? 'a' : undefined }
                            dataKey={ category }
                            fill={ getHexFromColorThemeValue(colorTheme[colors[idx]].background) }
                            isAnimationActive={false}
                        />

                    ))
                }
            </ReChartsBarChart>
        </ResponsiveContainer>
    </div>
);

export default BarChart;