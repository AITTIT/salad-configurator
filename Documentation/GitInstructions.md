# Basic workflow

1. Pick a task from Kanban

![alt text](./docImages/kanbanOverall.PNG)

2. Assign the task to yourself from the right panel in task view.

![alt text](./docImages/taskAssign.png)

3. Create a branch from the right panel in task view. (with CLI or Github)

![alt text](./docImages/creatingBranch.png)

4. Choose "Checkout locally" -> "Create Branch"

![alt text](./docImages/branchCheckout.png)

5. Run the given commands in your working directory with CLI

![alt text](./docImages/branchingCommands.png)

![alt text](./docImages/branchingCommandsRun.png)

6. Move task in Kanban

![alt text](./docImages/kanbanInProgress.png)

7. Do the work, add, commit and push (might get some errors about the branch head not pointing to the right remote branch.)

![alt text](./docImages/addCommitPush.png)

8. Create a pull request on the "Pull requests" tab in Github, click "New pull request"

![alt text](./docImages/pullRequestGhub.png)

9. Choose the right branch to merge:

![alt text](./docImages/ChoosingBranchToMerge.png)

10. Create pull request:

![alt text](./docImages/creatingPullRequest.png)

11. Details can be written in the description section.

(Might be redundant because GitHub seems to move the tasks already when the branch of the same issue is merged, but Writing "Closes [task_number]" moves the task to Done in the kanban board after merging.)

![alt text](./docImages/pullRequestDescription.png)

12. Now the PR needs to be reviewed for it to be able to merge into main

![alt text](./docImages/gitPrReview.png)