export const showProjectInfo = () => {
  const prettierLog = (title, value) => {
    console.log(
      `%c ${title} %c ${value} %c`,
      'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
      'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff',
      'background:transparent'
    );
  };
  const { commitHash, commitDate, commitUserName, commitMessage } = process.env
    .VUE_APP_RELEASE_PROJECT_GIT as any;
  const {
    NODE_ENV,
    VUE_APP_RELEASE_PROJECT_LASTBUILD,
    VUE_APP_RELEASE_PROJECT_PACKAGE,
  } = process.env as any;

  const buildRepository =
    NODE_ENV === 'development'
      ? VUE_APP_RELEASE_PROJECT_PACKAGE.repository
      : `https://gitee.com/galaxy-s10/${VUE_APP_RELEASE_PROJECT_PACKAGE.name}`;

  prettierLog('项目名称：', VUE_APP_RELEASE_PROJECT_PACKAGE.name);
  prettierLog('项目版本：', VUE_APP_RELEASE_PROJECT_PACKAGE.version);
  prettierLog('项目仓库：', VUE_APP_RELEASE_PROJECT_PACKAGE.repository);
  prettierLog('构建仓库：', buildRepository);
  prettierLog('最后构建：', VUE_APP_RELEASE_PROJECT_LASTBUILD);
  prettierLog('构建仓库git提交用户：', commitUserName);
  prettierLog('构建仓库git提交日期：', commitDate);
  prettierLog('构建仓库git提交信息：', commitMessage);
  prettierLog('构建仓库git提交哈希：', commitHash);
  console.warn(
    '当前项目的代码是托管在github，但由于线上构建如果使用github的话，会因为github拉取代码太慢以及一些秘钥文件不方便处理等原因，'
  );
  console.warn(
    '因此目前的线上构建是将github的代码做一层处理，然后再复制到gitee的私有仓库，使用gitee的代码进行构建的，'
  );
  console.warn(
    '因为github和gitee提交的数据不一致，因此项目信息和git信息会对不上，大多数情况下github和gitee仓库代码都会尽量保持同步~'
  );
};
