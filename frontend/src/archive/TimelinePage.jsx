import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

const TimelinePage = () => {
  return (
    <div style={{ background: 'black', padding: '20px', color: 'white' }}> {/* Add a wrapper with a black background and white text */}
      <VerticalTimeline>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          contentStyle={{ background: 'black', color: 'white', border: '1px solid white' }} // Black background with white text and border
          contentArrowStyle={{ borderRight: '7px solid white' }} // White arrow
          date="2024 - Present"
          iconStyle={{ background: 'black', color: 'white' }} // Black background with white icon color
          // icon={<ExerciseIcon />} // Uncomment and customize if you have an icon
        >
          <h3 className="vertical-timeline-element-title">Handstand Practice</h3>
          <h4 className="vertical-timeline-element-subtitle">Daily Routine</h4>
          <p>
            Improving balance and core strength through daily handstand practice.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2023 - 2024"
          contentStyle={{ background: 'black', color: 'white', border: '1px solid white' }}
          iconStyle={{ background: 'black', color: 'white' }} // Black background with white icon color
          // icon={<ExerciseIcon />} // Uncomment and customize if you have an icon
        >
          <h3 className="vertical-timeline-element-title">Pull-Up Mastery</h3>
          <h4 className="vertical-timeline-element-subtitle">Weekly Training</h4>
          <p>
            Focused on increasing pull-up count and improving back muscle strength.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2022 - 2023"
          contentStyle={{ background: 'black', color: 'white', border: '1px solid white' }}
          iconStyle={{ background: 'black', color: 'white' }} // Black background with white icon color
          // icon={<ExerciseIcon />} // Uncomment and customize if you have an icon
        >
          <h3 className="vertical-timeline-element-title">Pistol Squat Progression</h3>
          <h4 className="vertical-timeline-element-subtitle">Monthly Goals</h4>
          <p>
            Working on single-leg squats to enhance leg strength and balance.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--work"
          date="2021 - 2022"
          contentStyle={{ background: 'black', color: 'white', border: '1px solid white' }}
          iconStyle={{ background: 'black', color: 'white' }} // Black background with white icon color
          // icon={<ExerciseIcon />} // Uncomment and customize if you have an icon
        >
          <h3 className="vertical-timeline-element-title">Muscle-Up Challenge</h3>
          <h4 className="vertical-timeline-element-subtitle">Bi-Weekly Training</h4>
          <p>
            Aiming to achieve the perfect muscle-up for upper body strength.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="2020"
          contentStyle={{ background: 'black', color: 'white', border: '1px solid white' }} // Black background with white text and border
          contentArrowStyle={{ borderRight: '7px solid white' }} // White arrow
          iconStyle={{ background: 'black', color: 'white' }} // Black background with white icon colo
          // icon={<EducationIcon />} // Uncomment and customize if you have an icon
        >
          <h3 className="vertical-timeline-element-title">Calisthenics Basics</h3>
          <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
          <p>
            Learning the fundamentals of calisthenics including push-ups, pull-ups, and dips.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="2019"
          contentStyle={{ background: 'black', color: 'white', border: '1px solid white' }} // Black background with white text and border
          contentArrowStyle={{ borderRight: '7px solid white' }} // White arrow
          iconStyle={{ background: 'black', color: 'white' }} // Black background with white icon color
          // icon={<EducationIcon />} // Uncomment and customize if you have an icon
        >
          <h3 className="vertical-timeline-element-title">Strength Training Fundamentals</h3>
          <h4 className="vertical-timeline-element-subtitle">Certification</h4>
          <p>
            Comprehensive training in basic strength exercises and fitness principles.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          className="vertical-timeline-element--education"
          date="2018"
          contentStyle={{ background: 'black', color: 'white', border: '1px solid white' }} // Black background with white text and border
          contentArrowStyle={{ borderRight: '7px solid white' }} // White arrow
          iconStyle={{ background: 'black', color: 'white' }} // Black background with white icon color
          // icon={<EducationIcon />} // Uncomment and customize if you have an icon
        >
          <h3 className="vertical-timeline-element-title">Bodyweight Training Workshop</h3>
          <h4 className="vertical-timeline-element-subtitle">Workshop</h4>
          <p>
            Hands-on workshop focusing on bodyweight exercises for overall fitness.
          </p>
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: 'black', color: 'white' }} // Black background with white icon color
          // icon={<StarIcon />} // Uncomment and customize if you have an icon
        />
      </VerticalTimeline>
    </div>
  );
}

export default TimelinePage;
