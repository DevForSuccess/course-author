import axios from 'axios';
import Pointer from './components/Pointer.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { AuthorWrapper, InstHeader, NameHeader, JobHeader, AvatarInfo, AvatarParent, AvatarImage, InstructorStats, StatListItem, MiniIcon, IconIcon, PentPath, RibbonPath, PeoplePath, PlayPath, StatListItemText, BioWrapper, BioContents, BioParagraph, BioBefore, BioAfter } from './components/Styles.jsx';

const numberWithCommas = (x) => {
    return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : null;
};

class Author extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: {},
            expanded: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const regex = /\d+/;
        let course = window.location.search.match(regex) === null ? 5 : window.location.search.match(regex)[0];
        console.log('course id: ', course);
        this.getAuthor(course);
    }

    getAuthor(id = 5) {
        // axios.get(`http://ec2-54-234-67-3.compute-1.amazonaws.com:3000/overview/?courseId=${id}`)
        // .then((res) => {
        //   let authorId = res.data.author;
        //   console.log('author number', authorId);
        //   axios.get(`http://ec2-3-95-223-55.compute-1.amazonaws.com:4095/author/?authorId=${authorId}`)
        //   axios.get(`http://3.15.228.199:4095/author/?authorId=${id}`)
        axios.get(`/api/author/?authorId=${id}`)
            .then((res) => {
                console.log('author id: ', res.data);
                this.setState({
                    author: res.data
                });
            })
            .catch((err) => console.log(err));
    }

    handleClick() {
        this.setState({ expanded: !this.state.expanded });
    }

    render() {
        let img = 'https://authors-image.s3.amazonaws.com/';
        if (this.state.author.thumbnail) {
            let imgUrl = this.state.author.thumbnail.slice(-7);
            let imgNum = parseInt(imgUrl.slice(0, 3), 10);
            img = img + imgNum + '.jpg';
            // img += this.state.author.thumbnail.slice(-7);
        }

        return (
            <AuthorWrapper>
                <InstHeader>Instructor</InstHeader>
                <NameHeader href={'https://udemy.com/user/' + this.state.author.firstName + this.state.author.lastName}>{this.state.author.firstName} {this.state.author.lastName}</NameHeader>
                <JobHeader>
                    {this.state.author.job}, {this.state.author.employer}
                </JobHeader>
                <AvatarInfo>
                    <AvatarParent href={'https://udemy.com/user/' + this.state.author.firstName + this.state.author.lastName}>
                        <AvatarImage src={img} />
                    </AvatarParent>
                    <InstructorStats>
                        <StatListItem>
                            <MiniIcon aria-hidden="true" focusable="false">
                                {PentPath}
                            </MiniIcon>
                            <StatListItemText>
                                {this.state.author.rating} Instructor Rating
                            </StatListItemText>
                        </StatListItem>
                        <StatListItem>
                            <MiniIcon aria-hidden="true" focusable="false">
                                {RibbonPath}
                            </MiniIcon>
                            <StatListItemText>
                                {numberWithCommas(this.state.author.reviews)} Reviews
                            </StatListItemText>
                        </StatListItem>
                        <StatListItem>
                            <MiniIcon aria-hidden="true" focusable="false">
                                {PeoplePath}
                            </MiniIcon>
                            <StatListItemText>
                                {numberWithCommas(this.state.author.students)} Students
                            </StatListItemText>
                        </StatListItem>
                        <StatListItem>
                            <MiniIcon aria-hidden="true" focusable="false">
                                {PlayPath}
                            </MiniIcon>
                            <StatListItemText>
                                {numberWithCommas(this.state.author.courses)} Courses
                            </StatListItemText>
                        </StatListItem>
                    </InstructorStats>
                </AvatarInfo>
                <BioWrapper expanded={this.state.expanded}>
                    <BioBefore expanded={this.state.expanded} onClick={this.handleClick}>{this.state.expanded ? 'Show less' : 'Show more'} <Pointer expanded={this.state.expanded} /></BioBefore>
                    <BioContents expanded={this.state.expanded}>
                        <BioParagraph expanded={this.state.expanded}>{this.state.author.bio}</BioParagraph>
                    </BioContents>
                    <BioAfter expanded={this.state.expanded}></BioAfter>
                </BioWrapper>
            </AuthorWrapper>
        );
    }
}

ReactDOM.render(<Author />, document.getElementById('author'));