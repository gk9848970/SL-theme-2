import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './css/Facultyy.css';
import ReactGA from 'react-ga';
import * as api from '../Api';
import { useState, useEffect } from 'react';
import Link from './Link';

function Facultyy({id}) {
    const [faculty, setFaculty] = useState([]);
    const [status, setStatus] = useState(false);
    const [defImages, setDefImages] = useState({});
    useEffect(() => {
        api.fetchFaculty(id, 100)
            .then((data) => {
                if (data.status === "success") {
                    setFaculty(data.response);
                    setStatus(true);
                    setDefImages(data.default_img);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
            margin: '10px',
        },
        media: {
            height: 350,
        },
    });

    const classes = useStyles();
    if(status){
        return (
            <div className="app">
                <h1 className="text-center">Faculty Details</h1>
                <div className="faculty">

                    {faculty.map(function (instructor, index) {
                        return (
                            <>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <Link href={"faculty/" + instructor.faculty_name}>
                                            <CardMedia
                                                className={classes.media}
                                                image={instructor.url}
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {instructor.faculty_name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p" dangerouslySetInnerHTML={{ __html: instructor.faculty_detail }} />

                                            </CardContent>
                                        </Link>
                                    </CardActionArea>
                                </Card><br />

                            </>
                        )
                    })}


                </div>
                <br />
            </div>
        )

    } else{
        return(<>
            <h1 className="text-center mt-5">No faculty</h1>
        </>)
    }
   
}

export default Facultyy
