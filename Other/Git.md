# git

版本控制器

[Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN)

### linux常用命令

- mkdir 创建文件夹
- touch 创建文件
- rm 删除
    - rm -rf 删除文件夹
- open 打开目录或者文件
- cd 跳转到对应目录

------

### git常用命令

用上下箭头表示文件转移方向

- HEAD 指针 指向当前分支

- git init：初始化git仓库

- git add：将工作区代码提交至暂存区

    - git add .：提交当前目录下所有文件

- git status：追踪文件状态

    - --short（-s）
        - ？？未追踪文件
        - A 添加到暂存区
        - ​    M被修改但是未放入暂存区
        - MM 修改后放入暂存区，并且又再次修改
        - M    被修改后放入暂存区
        - ​    D 删除
        - R    重命名

- git commit：从暂存区提交本地仓库、

    - git commit -m <commit msg>直接在-m后面写入commit信息 不使用vim编辑器
    - git commit -a：直接将被追踪且已修改文件commit至本地仓库
    - git commit --amend：修改上一次commit记录

- git ls-files：查看本地仓库文件

- git log：查看所处分支提交记录

    - -p 最近一条和diff，详细信息
    - -2 打印两条信息
    - --stat 简略信息
    - --onelien --decorate --all --graph

- git reset <commit id>：重置文件

    - git reset "HEAD^^" / HEAD~2：撤销两次 commit
        - 移动 HEAD 并且**带上所指向的分支**，可以通过哈希找回
    - --soft：将文件从本地仓库重置到暂存区
    - --mixed：将文件从本地仓库重置到工作区
    - --hard：将全部区域(不包含远程仓库)直接重置到目标版本，丢失暂存

- git restore --staged/--cached <file>：将文件从暂存区重置到工作区

- git rm：从git仓库中删除

    - 从git仓库中删除 -> 添加一个删除提交记录
    - 直接执行rm时 文件会直接从全部区域删除  -> 添加一个删除提交记录
    - git rm --cached <file>：从暂存区删除对应的文件
    - git rm -f  <file> 强制删除

- git mv file_from file_to 移动文件

    - git a.txt aa.txt 将 a.txt 修改成 aa.txt
    - mv file_from file_to
    - git rm file_from
    - git add file_to

- git branch：查看git分支

    - 分支相当于当前项目的一个备份 分支与分支之间独立
    - git branch <branch name>：新建分支
    - git branch -d <branch name>：删除对应分支 不能删除 HEAD 指向分支以及未合并分支
    - git branch -D <branch name>

- git checkout/switch：切换分支

    - git checkout -b <branch name>：新建分支并切换
    - git checkout -- a.txt 撤销还未添加到暂存区文件的更改

- git diff：比较差异

    - git diff：直接执行比较的是 暂存区和工作区
    - git diff --cached：比较 暂存区和本地仓库
    - git diff <branch name>/HEAD：比较 本地仓库和工作区
    - git diff <branch name1> <branch name2>：比较两个分支差异

- git merge：合并分支

    + --no-ff <commit msg> 禁止快速前移
    + --abort 取消合并

    ```javascript
    <<<<<<< HEAD 当前分支的代码
    <script src="index2.js"></script>
    =======
    <script src="index3.js"></script>
    ```

- git pull相当于git fetch + git merge

- git tag：查看标签

    - git tag v1.0 默认在最新的commit提交上
    - git tag v1.0 <commit id> 给指定 commit 添加标签
    - git tag -a v1.0 -m "描述信息" <commit id> 添加带有说明的标签
    - git show v1.0 查看标签说明
    - git tag -d v1.0 删除标签

- git stash：暂存（pop）

- git revert <commit msg>：回滚 重置对应提交的操作

- git reflog 查看历史提交记录

- git stash 存储暂存区以及工作目录修改文件

    - -u 在上面基础上加上未追踪文件
    - list 打印所有存储内容
    - apply <stashName> 将存储内容重新应用，默认不保留已暂存内容
    - apply <stashName> --index 将原暂存依旧以暂存形式取出
    - drop  <stashName> 取出时不会默认删除，需要移除存储

- git rebase <branch name> 将一个分支的内容都移至另一个分支，只移动，并没有合并

1. 工作区 相当于本地
    - git add <file>↓
2. 暂存区
    - git commit -m <commit msg>↓
    - git restore --staged <file>↑
    - git rm --cached <file>↑
3. 本地仓库
    - git reset --soft <commit id>↑
    - git reset <commit id>↑↑
    - git push↓
4. 远程仓库
    - git pull↑
    - git revert↑

### git hooks

- commit-msg：处理提交信息 执行时传入commit-msg的临时路径
- yorkie： 优化husky 对githooks进行操作

  

- git remote add origin http://

- git push -u origin master

- .gitignore：忽略文件 忽略某些文件 使用add时不提交
- git checkout -b branch1 origin/branch1 远程仓库克隆分支
- git push origin :branch 删除远程仓库分支
- git push origin v1.0 推送标签到远程仓库
  
  - git push origin --tags  推送所有标签
- git push origin :refs/tags/v1.0 删除远程仓库的标签
- ssh-keygen -t rsa -C "zmouse@miaov.com"
- SSH
  - ssh-keygen -t rsa -C "zmouse@miaov.com"
  - 在github上找到settings，设置SSH
  - 将生成的文件填到对应的位置（生成的信息给到仓库的管理者）