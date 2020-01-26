import React from 'react'
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPassport, faBriefcase, faHome, faEnvelope, faBlog } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faLinkedinIn, faGithub, faSlack, faGooglePlus } from '@fortawesome/free-brands-svg-icons'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 0, 2, 0),
  },
  icon: {
    color: theme.palette.primary.main,
    fontSize: 18,
    marginRight: theme.spacing(2),
  },
  contactDetail: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
  },
  linkIcon: {
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1),
    '&:hover': {
      opacity: 0.6,
    },
  },
}));

export default function ContactDetails() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography className={classes.contactDetail} variant="body2">
        <FontAwesomeIcon className={classes.icon} icon={faPassport} />Nathan Grubb
      </Typography>
      <Typography className={classes.contactDetail} variant="body2">
        <FontAwesomeIcon className={classes.icon} icon={faBriefcase} />Engineering Manager
      </Typography>
      <Typography className={classes.contactDetail} variant="body2">
        <FontAwesomeIcon className={classes.icon} icon={faHome} />Hồ Chí Minh, Việt Nam
      </Typography>
      <Typography className={classes.contactDetail} variant="body2">
        <FontAwesomeIcon className={classes.icon} icon={faEnvelope} />
        <Link href="mailto:nate@nathangrubb.io">nate@nathangrubb.io</Link>
      </Typography>
      <Typography>
        <Link href="https://www.facebook.com/ngrubb2">
          <FontAwesomeIcon className={classes.linkIcon} size="2x" icon={faFacebook} />
        </Link>
        <Link href="https://twitter.com/silent_snowman">
          <FontAwesomeIcon className={classes.linkIcon} size="2x" icon={faTwitter} />
        </Link>
        <Link href="https://www.linkedin.com/in/nathangrubb">
          <FontAwesomeIcon className={classes.linkIcon} size="2x" icon={faLinkedinIn} />
        </Link>
        <Link href="https://github.com/silent-snowman">
          <FontAwesomeIcon className={classes.linkIcon} size="2x" icon={faGithub} />
        </Link>
        <Link href="https://nathancaty.slack.com">
          <FontAwesomeIcon className={classes.linkIcon} size="2x" icon={faSlack} />
        </Link>
        <Link href="https://plus.google.com/u/0/101913867428624409865">
          <FontAwesomeIcon className={classes.linkIcon} size="2x" icon={faGooglePlus} />
        </Link>
        <Link href="https://silent-snowman.github.io">
          <FontAwesomeIcon className={classes.linkIcon} size="2x" icon={faBlog} />
        </Link>
      </Typography>
    </Container>
  );
}
