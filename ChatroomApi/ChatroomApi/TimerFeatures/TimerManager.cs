using System;
using System.Threading;

namespace ChatroomApi.TimerFeatures
{
    public class TimerManager
    {
        private Timer timer;
        private AutoResetEvent autoResetEvent;
        private Action action;

        public DateTime TimerStarted { get; set; }

        public TimerManager(Action _action)
        {
            action = _action;
            autoResetEvent = new AutoResetEvent(false);
            timer = new Timer(Execute, autoResetEvent, 1000, 10000);
            TimerStarted = DateTime.Now;
        }

        public void Execute(object stateInfo)
        {
            action();

            if ((DateTime.Now - TimerStarted).Seconds > 60)
            {
                timer.Dispose();
            }
        }
    }
}
