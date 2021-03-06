/*
 * Copyright (c) 2018, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
import { AppBar, Toolbar, Typography, IconButton } from 'material-ui';
import BackIcon from 'material-ui-icons/ArrowBack';
import GitHub from '../components/GitHub';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const style = {
    background: '#2196f3',
};

export default class Header extends React.Component {
    render() {
        return (
            <AppBar style={style}>
                <Toolbar>
                    <Link to={this.props.url} style={{ textDecoration: 'none' }}>
                        <IconButton>
                            <BackIcon />
                        </IconButton>
                    </Link>
                    <Typography type="title" style={{ flex: 1 }}>
                        {this.props.title}
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={() => {
                            window.location.href = 'https://github.com/wso2/react-vizgrammar';
                        }}
                        title="See the source on GitHub"
                    >
                        <GitHub />
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    };
}

Header.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};
