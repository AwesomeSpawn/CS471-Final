from login.models import AppUser
from jobs.models import Jobs

# Fetch the user by ID or email
try:
    user = AppUser.objects.get(user_id=5)
except AppUser.DoesNotExist:
    user = AppUser.objects.get(email='JohnDoe@gmail.com')

# Create dummy jobs
for i in range(1, 11):
    Jobs.objects.create(
        job_id=i,
        job_time=i * 2,
        assignee=user,
        task_str=f"Task description for job {i}"
    )
